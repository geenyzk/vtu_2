
export function redirect(path: any) {
  const _path = path as string
  const isExternal = _path.startsWith('http://') || _path.startsWith('https://') || _path.startsWith('//');

  window.location.href = isExternal ? _path : `${window.location.origin}${_path.startsWith('/') ? path : `/${path}`}`;
}