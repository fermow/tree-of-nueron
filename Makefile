PORT ?= 8989
HOST ?= 127.0.0.1

.PHONY: up serve check help

up: serve

serve:
	@echo "Tree of Neuron → http://$(HOST):$(PORT)"
	@python3 -m http.server $(PORT) --bind $(HOST)

check:
	@node --check assets/data.js
	@node --check assets/tree.js
	@node --check assets/event.js
	@node --check assets/research.js
	@node scripts/check-content.js

help:
	@echo "make up       Start the site on http://127.0.0.1:8989"
	@echo "make check    Validate JavaScript syntax"
	@echo "PORT=9000 make up    Use another port"
