const buildTree = (flatArray) => {
    var map = {}, node, roots = [], i;
    
    for (i = 0; i < flatArray.length; i += 1) {
      map[flatArray[i].modId] = i;      // initialize the map
      flatArray[i].children = [];    // initialize the children
    }
    
    for (i = 0; i < flatArray.length; i += 1) {
      node = flatArray[i];
      if (node.parentId !== "0" && node.parentId !== 0) {
        // if you have dangling branches check that map[node.parentId] exists
        flatArray[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
}
export {
    buildTree
}