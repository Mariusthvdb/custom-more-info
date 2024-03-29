---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**Debug JSON from Inspector**
```
{
    "hide": [
        "icon_color",
        "id"
    ],
    "unhide": [
        "device_class"
    ]
}
```
**Custom-more-info Version:**
1.0.0

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Dom Path of attributes dropdown box**
Always include screenshot to the path of the attributes that error
We cant help you without that exact info

**Desktop (please complete the following information):**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**The custom-more-info configuration**
```yaml
filter_attributes:
  by_glob:
    '*.*':
      - id
  by_domain:
    light:
      - all
```

**Additional context**
Add any other context about the problem here.
