document.addEventListener('DOMContentLoaded', function () {
    const availableProducts = document.getElementById('availableProducts');
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const shoppingList = document.getElementById('shoppingList');
    const clearListBtn = document.getElementById('clearListBtn');
    const errorAlert = document.getElementById('errorAlert');

    // Objeto com o mapeamento das imagens para cada produto
    const productImages = {
        'Arroz': 'img/arroz.jpg',
        'Feijão': 'img/feijao.jpg',
        'Leite': 'img/leite.jpg',
        'Ovos': 'img/ovos.jpg',
        'Pão': 'img/pao.jpg'
    };

    // Carrega os itens salvos no LocalStorage ao inicializar a página
    loadItemsFromLocalStorage();

    // Verifica se o item já existe na lista
    function isItemInList(item) {
        const items = shoppingList.getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            if (items[i].querySelector('span').innerText.toLowerCase() === item.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    // Função para adicionar um item à lista de compras e ao LocalStorage
    function addItemToList(itemText) {
        if (itemText !== '') {
            if (!isItemInList(itemText)) {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

                // Cria a imagem do item, se houver
                const itemImage = document.createElement('img');
                itemImage.src = productImages[itemText] || 'img/default.jpg'; // Usa a imagem correspondente ou uma padrão
                itemImage.alt = itemText;
                itemImage.style.width = '50px';
                itemImage.style.height = '50px';
                itemImage.classList.add('me-3'); // Espaçamento entre imagem e texto

                // Cria o texto do item
                const itemSpan = document.createElement('span');
                itemSpan.innerText = itemText;

                // Cria o botão de remoção
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-danger btn-sm deleteBtn';
                deleteBtn.innerText = 'Remover';

                // Adiciona imagem, texto e botão ao item da lista
                listItem.appendChild(itemImage);
                listItem.appendChild(itemSpan);
                listItem.appendChild(deleteBtn);

                // Adiciona o item à lista
                shoppingList.appendChild(listItem);

                // Salva o item no LocalStorage
                saveItemToLocalStorage(itemText);

                // Limpa os campos de entrada
                itemInput.value = '';
                availableProducts.value = '';

                // Esconde o alerta de erro, se estiver visível
                errorAlert.classList.add('d-none');
            } else {
                // Mostra o alerta de erro se o item já estiver na lista de compras
                errorAlert.classList.remove('d-none');
            }
        }
    }

    // Adiciona o item ao clicar no botão
    addItemBtn.addEventListener('click', function () {
        const selectedItem = availableProducts.value;
        const typedItem = itemInput.value.trim();

        if (typedItem !== '') {
            addItemToList(typedItem);
        } else if (selectedItem !== '') {
            addItemToList(selectedItem);
        }
    });

    // Remove um item da lista e do LocalStorage
    shoppingList.addEventListener('click', function (e) {
        if (e.target.classList.contains('deleteBtn')) {
            const itemText = e.target.previousSibling.innerText;
            e.target.parentElement.remove();
            removeItemFromLocalStorage(itemText);
        }
    });

    // Limpa toda a lista de compras e o LocalStorage
    clearListBtn.addEventListener('click', function () {
        shoppingList.innerHTML = '';
        localStorage.removeItem('shoppingList');
        errorAlert.classList.add('d-none');
    });

    // Salva um item no LocalStorage
    function saveItemToLocalStorage(item) {
        let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.push(item);
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    // Remove um item do LocalStorage
    function removeItemFromLocalStorage(item) {
        let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items = items.filter(i => i !== item);
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    // Carrega os itens salvos no LocalStorage e exibe na lista
    function loadItemsFromLocalStorage() {
        let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.forEach(item => addItemToList(item));
    }
});
