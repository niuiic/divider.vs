# divider.vs

## Features

- highlight, list, navigate to divide lines
- highly configurable

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
  ]
}
```

- level: level of current divider
- dividerRegex: regex to match the divider
- textRegex: regex to match the content of the divider
- color: highlight color
- list: whether to list the divider in sidebar
