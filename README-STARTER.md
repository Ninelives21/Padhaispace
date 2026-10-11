# Padhaispace starter — October 2026

This is a **small additive delta** for the existing `Ninelives21/Padhaispace` repository.
It does not replace `PROJECT_BRIEF.md` or any previously created folders.

## Install (from the Padhaispace repository in your VS Code terminal)

Download `padhaispace_starter.zip` to your Mac's Downloads folder, then run:

```bash
unzip -n ~/Downloads/padhaispace_starter.zip -d .
python3 -m http.server 8000
```

Open: http://localhost:8000/  
Matrix: http://localhost:8000/admin/syllabi/

Alternatively, use **VS Code Live Server**. Opening the HTML via `file://` will not load the JSON; a local HTTP server is required.

`unzip -n` avoids overwriting any existing files. If you need to apply an updated version later, review changes rather than blindly overwriting your work.

## Structure

- `index.html` — working public homepage stub.
- `admin/syllabi/index.html` — first administrative syllabus matrix.
- `styles/variables.css` — muted-blue Pankusdesk-inspired design tokens.
- `styles/site.css` — shared page styling.
- `scripts/syllabus-matrix.js` — search, subject/state switching, cell editing, export.
- `data/syllabi/structured/matrix.json` — provisional topic inventory and exam coverage (not yet mapped).
- `data/syllabi/sources/source-register.json` — preliminary official source links, years and stages.

## Using the matrix

- Seven columns: JEE Main, JEE Advanced, BITSAT, CBSE, NEET, IPE and EAPCET.
- AP/Telangana selector changes the IPE and EAPCET columns; their mappings remain independent.
- Each cell starts `?` **unreviewed**, not “absent”. Never infer inclusion/exclusion without checking the original document.
- Click a cell to cycle `?` → `✓` included → `◐` partly covered → `—` excluded → `?`.
- Edits are saved **in that browser only**. Click **Export updated JSON** to download `matrix.json`.
- Replace `data/syllabi/structured/matrix.json` with the downloaded file, then refresh the website. Once verified, commit it to Git.
- If edits seem to persist after replacing the file, choose **Discard local edits** to clear the browser draft (this does not change the repository file).
- This is a **chapter/topic-level starter taxonomy**, not the complete official subtopic comparison.
- The `/admin` route is **not private or protected**. Don't put secrets or paid PDFs there.

## Commit

```bash
git add index.html admin/syllabi/index.html styles scripts data/syllabi/structured/matrix.json data/syllabi/sources/source-register.json README-STARTER.md
git commit -m "Add Padhaispace homepage and syllabus comparison matrix"
git push origin main
```

No npm install, database or build command required.
