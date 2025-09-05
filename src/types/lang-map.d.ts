declare module 'lang-map' {
  const langMap: {
    languages: (ext: string) => string[] | undefined;
    extensions: (lang: string) => string[] | undefined;
  };
  export default langMap;
}