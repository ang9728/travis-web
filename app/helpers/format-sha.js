import { htmlSafe } from '@ember/string';
import { helper } from '@ember/component/helper';
import formatSha from 'travis/utils/format-sha';

export default helper((params) => {
  let [sha] = params;
  if (sha.includes('@')) sha = sha.split('@')[1];
  const formattedSha = formatSha(sha);
  return new htmlSafe(formattedSha);
});
