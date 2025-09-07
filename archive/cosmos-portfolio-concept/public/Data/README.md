# Portfolio Data Structure

This folder contains JSON files that drive the dynamic content of the cosmos portfolio website.

## Data Files

### techstack.json
Contains categorized technical skills with icons and descriptions.

### projects.json
Portfolio projects with detailed descriptions, tech stacks, and links.

### achievements.json
Awards, recognitions, and significant accomplishments.

### research.json
Academic research papers and publications.

### certifications.json
Professional certifications and credentials.

## Asset Organization

- `/Assets/skills/` - Technical skill icons and logos
- `/Assets/projects/` - Project screenshots and thumbnails
- `/Assets/achievements/` - Achievement badges and certificates
- `/Assets/certifications/` - Certification logos and badges
- `/Assets/certificates/` - PDF certificates and documents

## Path References

All image paths in JSON files use absolute paths starting with `/Assets/` for compatibility with both development and production builds.

Example:
```json
{
  "name": "Python",
  "icon": "/Assets/skills/python.png"
}
```

This structure ensures easy maintenance and deployment of the portfolio website.
