type Head<Tuple extends any[]> = Tuple extends [infer H, ...any[]] ? H : never;
type Tail<Tuple extends any[]> = ((...t: Tuple) => void) extends ((
  h: any,
  ...rest: infer R
) => void)
  ? R
  : never;
type IsEmpty<Tuple extends any[]> = {
  true: "true";
  false: "false";
}[Tuple extends [] ? "true" : "false"];
