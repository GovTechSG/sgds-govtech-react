export default function (componentName = "", elementName = ""): string {
  return `id-${Math.random().toString().substring(2, 6)}-sgds-${componentName}-${elementName}`;
}
