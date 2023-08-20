import { IUser } from '../models';
export function getAvatarUrl(user: IUser) {
  return `https://avatars.dicebear.com/api/avataaars/${hashCode(user.name)}.svg`;
}

function hashCode(str: string): string {
  let hash: number = 0;
  if (str && str.length > 0)
    for (let i = 0, len = str.length; i < len; i++) {
      let chr: number = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
  return hash.toString(36);
}
