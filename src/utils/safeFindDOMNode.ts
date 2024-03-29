import ReactDOM from 'react-dom';

export default function safeFindDOMNode(
  componentOrElement: React.ComponentClass | Element | null | undefined,
) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return ReactDOM.findDOMNode(componentOrElement as any);
  }
  return (componentOrElement ?? null) as Element | Text | null;
}
