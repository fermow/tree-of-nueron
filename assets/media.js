/* Curated internet imagery. Reused images illustrate the same structure or
   research context; captions never imply they document a different experiment.
   Full provenance and reuse terms are available at each linked Commons page. */
(() => {
  const archive = window.NEURON_VISUALS.archive;
  const additions = {
    'word-before-cell': {file:"1543, Andreas Vesalius' Fabrica, Base Of The Brain.jpg",credit:'Andreas Vesalius, 1543',type:'Later anatomical illustration',caption:'Vesalius’s later anatomical illustration shows visible nerves. It provides anatomical context for older cord-like terminology, not evidence of an ancient word’s first use.'},
    alcmaeon:{file:'Alcmeone di Crotone.jpg',credit:'Unknown artist, commemorative medal, 1832',type:'Later commemoration',caption:'An 1832 medal commemorating Alcmaeon of Croton. This is a later imagined likeness, not an ancient portrait.'},
    'sacred-disease':{file:'Hippocrates bust and title page Wellcome L0041093.jpg',credit:'Wellcome Collection · CC BY 4.0',type:'Later historical illustration',caption:'An eighteenth-century engraving of Hippocrates and a title page from a later edition of his works. It represents the Hippocratic tradition; authorship of On the Sacred Disease is not established by this portrait.'},
    aristotle:{file:'Aristotle Altemps Inv8575.jpg',credit:'Jastrow, 2006 · public domain',type:'Ancient sculpture',caption:'A Roman marble copy of a Greek portrait of Aristotle; the alabaster mantle is a later addition. Photograph by Jastrow.'},
    herophilus:{file:'Detail of a woodcut depicting Herophilus and Erasistratus Wellcome L0040791.jpg',credit:'Lorenz Fries, 1532 / Wellcome · CC BY 4.0',type:'Later historical illustration',caption:'Herophilus and Erasistratus in a 1532 woodcut. This is a much later depiction of the ancient anatomists.'},
    'leeuwenhoek-fontana':{file:'Leeuwenhoek microscope drawn by Baker, 1753.jpg',credit:'Henry Baker, 1753',type:'Historical instrument drawing',caption:'Leeuwenhoek’s microscope as drawn by Henry Baker in 1753. The image illustrates early microscopy, not a surviving record of the specific nerve-fiber observations.'},
    'electrical-medicine':{file:'18th century electro-therapeutic experiment. Wellcome M0012623.jpg',credit:'Nollet, 1746 / Wellcome · CC BY 4.0',type:'Historical experiment illustration',caption:'A plate on the physiological effects of electricity from Nollet’s 1746 work. It illustrates the broader experimental setting, rather than Veratti’s particular procedure.'},
    'nollet-osmosis':{file:'Osmosis diagram.svg',credit:'Wikimedia Commons contributors',type:'Modern teaching diagram',caption:'A modern diagram of osmosis through a membrane. Nollet used a bladder-covered vessel; the U-tube pictured here is not his 1748 apparatus.'},
    'walsh-electric-fish':{file:'Electric organ of Torpedo; John Hunter. Wellcome M0014494.jpg',credit:'John Hunter / Wellcome Collection · CC BY 4.0',type:'Historical anatomical illustration',caption:'John Hunter’s illustration of torpedo electric organs. It shows the animal anatomy investigated in the period of Walsh’s electrical studies, not Walsh’s experimental arrangement.'},
    'remak-schwann':{file:'Theodor Schwann Litho.jpg',credit:'Historical lithograph / Wikimedia Commons',type:'Researcher portrait',caption:'A lithographic portrait of Theodor Schwann, one of the researchers discussed in this combined milestone.'},
    matteucci:{file:'Carlo Matteucci. Lithograph by N. Fontani, 1853. Wellcome M0014810.jpg',credit:'N. Fontani, 1853 / Wellcome · CC BY 4.0',type:'Researcher portrait',caption:'Carlo Matteucci in an 1853 lithograph by N. Fontani, made after the muscle-current experiments discussed here.'},
    'virchow-myelin':{file:'Rudolf Virchow.jpg',credit:'Historical portrait / Wikimedia Commons',type:'Researcher portrait',caption:'Portrait of Rudolf Virchow, who introduced the name myelin in 1854.'},
    'bernstein-rheotome':{file:'Bernstein rheotome.jpg',credit:'Julius Bernstein, 1868',type:'Original apparatus drawing',caption:'Bernstein’s differential rheotome from his 1868 paper, used to reconstruct rapid electrical changes from repeated samples.'},
    'thudichum-lipids':{file:'Cell membrane detailed diagram en.svg',credit:'Mariana Ruiz Villarreal (LadyofHats) / Wikimedia Commons',type:'Modern teaching diagram',caption:'Modern depiction of membrane lipids and proteins. It provides chemical context; this molecular structure was not established by Thudichum’s 1884 analysis.'},
    nernst:{file:'Walther Nernst.jpg',credit:'Historical portrait / Smithsonian scientific identity collection',type:'Researcher portrait',caption:'Portrait of Walther Nernst, whose electrochemical relation supplied a quantitative link between ion distribution and voltage.'},
    overton:{file:'Cell membrane detailed diagram en.svg',credit:'Mariana Ruiz Villarreal (LadyofHats) / Wikimedia Commons',type:'Modern teaching diagram',caption:'A modern cell-membrane diagram illustrating a lipid boundary. Overton inferred lipid-like permeability; he did not establish the modern bilayer-and-protein model shown here.'},
    bernstein:{file:'Немецкий физиолог Юлий Бернштейн.jpg',credit:'Historical portrait / Wikimedia Commons',type:'Researcher portrait',caption:'Julius Bernstein, who proposed the membrane theory in 1902; this portrait is separate from his experimental records.'},
    'rio-oligodendrocytes':{file:'Pío del Río Hortega.jpg',credit:'Historical photograph, 1924 / Wikimedia Commons',type:'Researcher portrait',caption:'Pío del Río-Hortega in 1924, after his work identifying oligodendrocytes.'},
    'lillie-model':{file:'Saltatory conduction along a myelinated axonw.svg',credit:'Wikimedia Commons contributors',type:'Modern teaching diagram',caption:'Modern schematic of saltatory conduction, illustrating the question of separated active regions. It does not depict Lillie’s iron-wire analogy or its apparatus.'},
    'schmitt-diffraction':{file:'Myelinated neuron.jpg',credit:'Electron Microscopy Facility, Trinity College · public domain',type:'Later electron micrograph',caption:'A later electron micrograph shows the concentric myelin layers around an axon. This is not Schmitt’s 1935 X-ray diffraction pattern.'},
    'hodgkin-huxley-1939':{file:'Giant Axon of Squid (14356033761).jpg',credit:'NIH Image Gallery',type:'Research-context photograph',caption:'An archival NIH photograph of squid giant-axon research. It illustrates the experimental preparation, not the specific 1939 Hodgkin–Huxley recording or its investigators.'},
    'hodgkin-katz-1949':{file:'Giant Axon of Squid (14356033761).jpg',credit:'NIH Image Gallery',type:'Research-context photograph',caption:'NIH archival photograph of work on the squid giant axon. This is research context, not a photograph of Hodgkin and Katz’s 1949 sodium-substitution experiment.'},
    'hodgkin-huxley-1952':{file:'Voltage clamp setup.svg',credit:'smonsays, 2019 / Wikimedia Commons',type:'Modern apparatus schematic',caption:'A modern schematic of voltage clamp in a squid giant axon, illustrating the measurement principle used in the 1952 research.'},
    'myelin-wave-1952':{file:'Propagation of action potential along myelinated nerve fiber en.svg',credit:'Wikimedia Commons contributors',type:'Modern teaching diagram',caption:'Modern illustration of propagation along a myelinated fiber; not an original trace from the 1952 experiments.'}
  };
  Object.assign(archive, additions);
  for (const [id,media] of Object.entries(archive)) {
    if (!media.type) media.type = /modern|later diagram|reconstruction/i.test(media.caption) ? 'Modern teaching diagram' : /portrait/i.test(media.caption) ? 'Researcher portrait' : 'Historical illustration';
  }
  const credits = {
    'Osmosis diagram.svg':'KDS4444 · CC0',
    'Voltage clamp setup.svg':'smonsays, 2019 · CC BY-SA 4.0',
    'Giant Axon of Squid (14356033761).jpg':'NIH History Office · public domain',
    'Myelin sheath (1).svg':'Ralph Walterberg · CC BY-SA 3.0',
    'Neuron with oligodendrocyte and myelin sheath.svg':'LadyofHats / Andrew c · public domain',
    'Cell membrane detailed diagram en.svg':'Mariana Ruiz Villarreal (LadyofHats) · public domain',
    'Saltatory conduction along a myelinated axonw.svg':'Eleska · CC0',
    'Propagation of action potential along myelinated nerve fiber en.svg':'Helixitta · CC BY-SA 4.0',
    'Astatic Galvanometer.svg':'PieterJanR · public domain',
    'Plasmolysed Plant Cell.jpg':'Nicholas.H.Hale · CC BY-SA 4.0',
    'Experiment for Observing the Negative Variation.jpg':'LovelyOliveGreen · CC BY-SA 4.0'
  };
  for (const media of Object.values(archive)) if (credits[media.file]) media.credit=credits[media.file];
  const termMap={
    'neuron-greek':'word-before-cell','neura-anatomy':'herophilus',nervus:'vesalius',neurologia:'willis','primitive-cylinders':'leeuwenhoek-fontana',
    'soma-cell-body':'names','protoplasmic-processes':'deiters','axis-cylinder':'deiters','dendrite-1889':'names','neuron-1891':'cajal-waldeyer','axon-1896':'deiters',
    'medullary-sheath':'schmitt-diffraction','myelin-1854':'virchow-myelin','ranvier-node':'huxley-stampfli','saltatory-conduction':'tasaki-saltatory'
  };
  const synapse={file:'SynapseSchematic en.svg',credit:'Thomas Splettstoesser (www.scistyle.com) · CC BY-SA 4.0',type:'Modern teaching diagram',caption:'A modern synapse schematic. It illustrates today’s meaning of the word, not the structures or molecular mechanism visible when the term was introduced in 1897.'};
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function term(id){if(id==='synapse-1897')return synapse;const media=archive[termMap[id]];return media?{...media,caption:media.caption+' Used here as visual context for the word history; the image is not evidence of the first naming date.'}:null;}
  window.NEURON_MEDIA={escape,event:id=>archive[id],term,
    url:(media,width=800)=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(media.file)}?width=${width}`,
    source:media=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(media.file.replaceAll(' ','_'))}`
  };
})();
