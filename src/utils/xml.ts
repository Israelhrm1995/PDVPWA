export function xmlToJson(xml: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const jsessionNode = xmlDoc.querySelector("jsessionid");
    return jsessionNode ? { jsessionid: jsessionNode.textContent } : {};
  }

  export function xmlToJsonArray(xml: string, tag: string): any[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const nodes = xmlDoc.getElementsByTagName(tag);
    const result: any[] = [];
  
    for (let i = 0; i < nodes.length; i++) {
      const obj: any = {};
      for (const el of Array.from(nodes[i].children)) {
        obj[el.tagName] = el.textContent;
      }
      result.push(obj);
    }
  
    return result;
  }
  