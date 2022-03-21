# Contribution Guide

## Adding a new entry

Edit `entries.yml` and submit a pull request.

`path`, `reasons` and `reasons[].{description,source}` are required. `reasons[].source` can be either a URL or a list of URLs.

```yml
# ...
- pathname: /channel/<channelId>
  # or pathname: /c/<channelSlug>
  # or pathname: /user/<username>
  name: Evil Translation Ch.
  reasons:
    - description: Long history of misleading translations
      source: https://reddit.com/r/.../...
    - description: Doxxing VTuber's previous persona
      source:
        - https://reddit.com/r/.../...
        - https://twitter.com/...
```

### Acceptance criteria

- Clear malicious intent (e.g., doxxing, misinformation)
- Constant failure to abide by community norms (e.g., misleading content, overly sensitive thumbnail/content not intended by the talent, art theft)

### Removal criteria

- 1 year after stopping violating the above criteria
- Permanent termination of the channel
