export function deepEqual(object1, object2) {
  // Fix meta
  const metaObject1 = object1.meta;
  const metaObject2 = object2.meta;
  if (!metaObject1) object1['meta'] = null;
  if (!metaObject2) object2['meta'] = null;

  // Fix pivot (conversations)
  object1['pivot'] = null;
  object2['pivot'] = null;

  //Fix date
  object1['created_at'] = null;
  object2['created_at'] = null;
  object1['updated_at'] = null;
  object2['updated_at'] = null;
  object1['deleted_at'] = null;
  object2['deleted_at'] = null;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  // Si les objets n'ont pas les mêmes longueur = FALSE
  if (keys1.length !== keys2.length) {
    console.log(' !!! Les objets ne sont pas de même longueur. !!!');
    console.log('----------------------------------------Objet Scaling', object1);
    console.log('----------------------------------------Objet Staging', object2);
    throw new Error('BIM BAM BOUM');
    return false;
  }

  // POur toutes les keys dans les objets ...
  for (const key of keys1) {
    // On récupère la valeure de la key correspondante
    const val1 = object1[key];
    const val2 = object2[key];

    // Check si les deux values sont des objets
    const areObjects = isObject(val1) && isObject(val2);

    // Si c'est un objet ET que ça passe pas le test de récursivité
    if (areObjects && !deepEqual(val1, val2)) {
      console.log(' !!! Les objets ne sont pas pareil. !!!');
      console.log('----------------------------------------Objet Scaling', object1);
      console.log('----------------------------------------Objet Staging', object2);
      throw new Error('BIM BAM BOUM');
      return false;
    }

    // Si ce n'est pas un objet ET que la val 1 n'est pas égal à la val 2
    if (!areObjects && val1 !== val2) {
      console.log(' !!! Les objets ne sont pas pareil. !!!');
      console.log('----------------------------------------Objet Scaling', object1);
      console.log('----------------------------------------Objet Staging', object2);
      throw new Error('BIM BAM BOUM');
      return false;
    }
  }

  console.log('Les objets sont similaires.');
  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}
