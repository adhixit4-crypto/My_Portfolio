# LaTeX CV

This directory contains the editable LaTeX source and compiled PDF version of Adhixit Nandan Sharma's CV.

## Files

~~~text
latex-cv/
|-- cv.tex
|-- cv.pdf
|-- images/
|   +-- profile.jpg
+-- README.md
~~~

## Compile with Tectonic

From this directory:

~~~powershell
tectonic cv.tex
~~~

Tectonic downloads required LaTeX packages automatically and creates cv.pdf.

## Compile with a traditional LaTeX installation

If MiKTeX or TeX Live is installed:

~~~powershell
pdflatex cv.tex
pdflatex cv.tex
~~~

Running the compiler twice ensures that PDF metadata and hyperlinks are fully resolved.

## Editing

1. Update the content in cv.tex.
2. Keep the profile image at images/profile.jpg, or update the image path in cv.tex.
3. Compile the document again.
4. Review the generated cv.pdf before committing it.

## Links

The PDF includes clickable email, telephone, LinkedIn, GitHub profile, and project-repository links.
