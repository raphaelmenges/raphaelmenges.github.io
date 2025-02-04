/* Does not work in IE */
let less_count = 200;
let abstract_list = [];
let abstract_nodes = document.getElementsByClassName('abstract');
for (let i = 0; i < abstract_nodes.length; i++) {
  let text = abstract_nodes[i].innerText;
  if (text.length > less_count) {
    /* Replace innerText with two spans*/
    abstract_nodes[i].innerText = ''

    let less_text = document.createElement('span');
    less_text.innerText = text.slice(0, less_count) + '...';
    less_text.setAttribute('style', 'display: inline');
    abstract_nodes[i].appendChild(less_text);

    let full_text = document.createElement('span');
    full_text.innerText = text;
    full_text.setAttribute('style', 'display: none');
    abstract_nodes[i].appendChild(full_text);

    let a = document.createElement('a');
    a.setAttribute('href', 'javascript:toogleAbstract(' + abstract_list.length + ')');
    a.innerText = '[show more]';
    a.setAttribute('style', 'margin-left: 2px');
    abstract_nodes[i].appendChild(a);

    abstract_list.push([less_text, full_text, a, false]); // bool indicated less (false) or full (true).
  }
}

function toogleAbstract(idx) {
  item = abstract_list[idx];
  if (item[3]) { // full text to less text
    item[0].setAttribute('style', 'display: inline');
    item[1].setAttribute('style', 'display: none');
    item[2].innerText = '[show more]';
    item[3] = false;
  } else { // less text to full text
    item[0].setAttribute('style', 'display: none');
    item[1].setAttribute('style', 'display: inline');
    item[2].innerText = '[show less]';
    item[3] = true;
  }
}