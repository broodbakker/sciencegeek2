export const modifyTags = (tags: string[]) => {

  return tags.length === 0 ? [] : t(tags)
}

const t = (tags: string[]): string[] => {

  return (tags[0].search(",") !== -1 && tags.length === 1) ? tags[0].split(",") : tags
}

