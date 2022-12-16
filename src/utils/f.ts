export function formatDuration(sec: number, soft = false) {
  const formatInt = (int: number) => (int < 10 ? `0${int}` : int);
  if (!sec || !Number(sec)) return '00:00';
  if (typeof soft !== 'boolean') soft = false;

  const seconds = Math.round(sec % 60);
  const minutes = Math.floor((sec % 3600) / 60);
  const hours = Math.floor(sec / 3600);

  if (hours > 0) return soft ? `${formatInt(hours)}h ${formatInt(minutes)}m` : `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  if (minutes > 0) return soft ? `${formatInt(minutes)}m` : `${formatInt(minutes)}:${formatInt(seconds)}`;
  return soft ? `${formatInt(seconds)}s` : `00:${formatInt(seconds)}`;
}

export type DefaultValue = boolean | number | string;

export function getParam(V: unknown, D: number): { defaulted: boolean; value: number };
export function getParam(V: unknown, D: boolean): { defaulted: boolean; value: boolean };
export function getParam(V: unknown, D: string): { defaulted: boolean; value: string };
export function getParam(V: unknown, D: DefaultValue) {
  let output = {
    defaulted: false,
    value: V
  };

  if (V === undefined) {
    output.defaulted = true;
    output.value = D;
    return output;
  }

  if (typeof D === 'boolean') {
    if (V === 'true') {
      output.value = true;
    } else if (V === 'false') {
      output.value = false;
    } else {
      output.defaulted = true;
      output.value = D;
    }

    return output;
  }

  if (typeof D === 'string') {
    output.value = String(V);
    return output;
  }

  const num = Number(V);
  if (isNaN(num) || num < 0) {
    output.defaulted = true;
    output.value = D;
    return output;
  }

  output.value = num;

  return output;
}
