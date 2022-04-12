import { reactive } from 'vue'
import { useStore } from '/@/composables/useActions'

const editor = useStore()

export const message = reactive({
  data:''
})

export const dragDrop = reactive({
  source:Object,
  target:Object
})


export function slugify ( value:string ){
    if ( !value ) return ''
    return value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}

export function removeNestedObjectsKey( currentNode:Object = {} , arrayKey:Object = [] , deleteKey:String = ''){
  delete currentNode[deleteKey]
  currentNode[arrayKey].forEach ( obj => {
      removeNestedObjectsKey ( obj , arrayKey , deleteKey)
  })
  return currentNode
 
}

export function searchIconify ( search: String ){
    const limit: Number = 100
    const resolve = new Promise ( (resolve,reject ) =>{
        fetch ( 'https://api.iconify.design/search?query=' + search + '&limit=' + limit , { mode: 'cors'})
        .then ( res => res.json() )
        .then ( icons => resolve ( icons ))
        .catch ( err => {
            console.log ( err )
        })
    })
    return resolve
}

export function orphans() {
    return data.filter(function(item) {
      return item.parent === null;
    });
  }
  
  function hasChildren(parentId) {
    return data.some(function(item) {
      return item.parent === parentId;
    });
  }
  
  function getChildren(parentId) {
    return data.filter(function(item) {
      return item.parent === parentId;
    });
  }
  
  function generateListItem(item) {
    console.time('generateListItem');
    const li = document.createElement('li');
    li.id = 'item-' + item.id;
    li.classList.add('item');
    if (hasChildren(item.id)) {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = '+';
      a.classList.add('plus');
      a.addEventListener('click', expand);
      li.appendChild(a);
    }
    const span = document.createElement('span');
    const icon = document.createElement('i');
    if ( item.tag != 'root'){
        icon.setAttribute('data-icon' , 'ic:baseline-' + item.icon.replace('_','-') ); //item.name === 'container' ? 'carbon:area' : 'carbon:code' );
    } else {
        icon.setAttribute('data-icon' , item.icon );
    }
    icon.classList.add('iconify');
    icon.classList.add('text-lg');
    const iName = document.createElement('span');
    iName.textContent = item.tag;
    span.appendChild ( icon );
    span.appendChild ( iName )
    li.appendChild(span);
    console.timeEnd('generateListItem');
    return li;
  }
  
  function expand(event) {
    console.time('expand');
    event.preventDefault();
    event.stopPropagation();
    const et = event.target,
          parent = et.parentElement,
          id = parent.id.replace('item-', ''),
          kids = getChildren(id),
          items = kids.map(generateListItem),
          ul = document.createElement('ul');
    ul.classList.add( 'tree' )
    items.forEach(function(li) {
      ul.appendChild(li);
    });
    parent.appendChild(ul);
    et.classList.remove('plus');
    et.classList.add('minus');
    et.textContent = '-';
    et.removeEventListener('click', expand);
    et.addEventListener('click', collapse);
    console.timeEnd('expand');
  }
  
  function collapse(event) {
    console.time('collapse');
    event.preventDefault();
    event.stopPropagation();
    const et = event.target,
          parent = et.parentElement,
          ul = parent.querySelector('ul');        
    parent.removeChild(ul);
    et.classList.remove('minus');
    et.classList.add('plus');
    et.textContent = '+';
    et.removeEventListener('click', collapse);
    et.addEventListener('click', expand);
    console.timeEnd('collapse');
  }
  
export function addOrphans() {
    const root = document.querySelector('#root')

    const orphansArray = orphans();
    if (orphansArray.length) {
      const items = orphansArray.map(generateListItem),
            ul = document.createElement('ul');
      items.forEach(function(li) {
        ul.appendChild(li);
      });
      root.appendChild(ul);
    }
  }

function generateBlockList ( block , id ){
    block.blocks.map ( el => {
        
            data.push ( { 
                    id: el.id ,
                    name: el.type,
                    tag: el.semantic || el.tag,
                    element: el.element,
                    icon: el.icon,
                    parent: id
                }
            )
            el.blocks.length ?
                generateBlockList ( el , el.id ) : null
    })
}


var data = []

export function generateTreeArray ( element ){
    data = []
    if ( element ){
        data.push ( {
            id: element.id ,
            name: "root",
            tag: 'root',
            element: 'root',
            icon: 'bx:folder',
            parent: null
        })
        
        element.blocks.map ( el => {
            data.push ( {
                id: el.id ,
                name: el.type,
                tag: el.semantic || el.tag,
                element: el.semantic || el.element,
                icon: el.icon,
                parent: element.id
            })
            if ( el.blocks.length ){
                console.log ( generateBlockList ( el , el.id ) )
                generateBlockList ( el , el.id )
            }
        })
        console.log ( data )
        addOrphans ()
    }
}

