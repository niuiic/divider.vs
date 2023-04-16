# divider.vs

## Features

- highlight, list, navigate to dividers
- mark current divider
- highly configurable

<img src="https://github.com/niuiic/assets/blob/main/divider.vs/divider.png" />

## Example Config

in `settings.json`

```json
{
  "divider.divider": [
    {
      "level": 1,
      "dividerRegex": "%%=+ [\\S\\s]+ =+%%",
      "textRegex": "%%=+ ([\\S\\s]+) =+%%",
      "color": "green",
      "list": true
    },
    {
      "level": 2,
      "dividerRegex": "%%\\-+ [\\S\\s]+ \\-+%%",
      "textRegex": "%%\\-+ ([\\S\\s]+) \\-+%%",
      "color": "yellow",
      "list": true
    }
  ],
  "divider.iconPath": "path to icon(prefer svg)",
  "divider.markCurrentDivider": true
}
```

- divider
  - level: level of current divider
  - dividerRegex: regex to match the divider
  - textRegex: regex to match the content of the divider
  - color: highlight color
  - list: whether to list the divider in sidebar
- iconPath: path to icon which is used to mark current divider
- markCurrentDivider: whether to mark current divider, default is true
