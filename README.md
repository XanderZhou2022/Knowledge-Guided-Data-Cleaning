# Knowledge-Guided-Data-Cleaning

**Knowledge-Guided Data Cleaning: From Knowledge Acquisition to Reliable Decisions**  
Yixi Zhou · Hong Kong Baptist University · 2026

A survey connecting knowledge acquisition with supported data repairs, reliability and data preparation across 30 studies.

## Read and present

- [Survey paper (PDF, 7 pages)](paper.pdf)
- [Presentation (PDF, 52 slides)](slides.pdf)
- [Editable presentation (PowerPoint)](slides.pptx)
- [Project website](https://xanderzhou2022.github.io/Knowledge-Guided-Data-Cleaning/)

## Speaker scripts and preparation notes

- [English speaker script (Word)](presentation/Knowledge_Guided_Data_Cleaning_English_Script.docx)
- [Chinese preparation guide (Word)](presentation/Knowledge_Guided_Data_Cleaning_%E4%B8%AD%E6%96%87%E5%A4%87%E8%AF%BE%E8%AF%A6%E8%A7%A3.docx)
- [All scripts, editable Markdown, and archived drafts](presentation/README.md)

Both Word documents follow the 52-slide presentation. The Chinese guide includes each slide's purpose, spoken script, visual explanation and transitions, plus explanations of the 30 studies, discussion questions and a glossary.

## Website

The static website includes an interactive running example, a searchable index of all 30 studies, take-home messages, and links to the paper and presentation. It runs without a build step or external dependencies. Comic Relief webfonts are served locally so the typography also works on iPhone Safari; their SIL Open Font License is included in `assets/fonts/`.

Preview locally:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The `gh-pages` branch serves the project website and its paper and slide downloads. Configure GitHub Pages to deploy from **gh-pages / (root)**.

## Citation

```bibtex
@misc{zhou2026knowledgeguided,
  title = {Knowledge-Guided Data Cleaning: From Knowledge Acquisition to Reliable Decisions},
  author = {Zhou, Yixi},
  year = {2026},
  note = {Survey, Hong Kong Baptist University},
  url = {https://xanderzhou2022.github.io/Knowledge-Guided-Data-Cleaning/}
}
```

Contact: [yxzhou@comp.hkbu.edu.hk](mailto:yxzhou@comp.hkbu.edu.hk)
