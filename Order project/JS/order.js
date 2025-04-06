document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('[class^="container"]');
    const chooseButtons = document.querySelectorAll('.btn');
    const cartItem = document.getElementById('cartItem');
    const totalPrice = document.getElementById('total');

    const prices = {
        'Oil pastels': 10,
        'Graphite pencil': 8,
        'Extra Large': 7,
        'Large': 5,
        'Medium': 4,
        'File size': 3,
        'Beginner': 3,
        'Artistic': 7,
        'Realistic': 9,
        'Plasitc wrapping': 3,
        'Protection spray': 2
    };

    let selectedItems = {};
    let currentIndex = 0;

    containers.forEach((container, index) => {
        const boxes = container.querySelectorAll('.box');
        const containerKey = `container${index + 1}`;

        boxes.forEach(box => {
            box.addEventListener('click', function () {
                boxes.forEach(b => b.classList.remove('selected'));
                box.classList.add('selected');
                selectedItems[containerKey] = box.querySelector('h2').textContent.trim();
                updateCart();

                // If last container is selected, show confirm alert
                if (index === containers.length-1) {
                    setTimeout(() => {
                        if (confirm("You have reached the last step! Click OK to proceed to the next page.")) {
                            proceedToNextPage();
                        }
                    }, 300);
                }
            });
        });
    });

    function updateCart() {
        const items = [];
        let total = 0;

        for (const key in selectedItems) {
            const item = selectedItems[key];
            if (item) {
                items.push(`<div class="content"><div class="item">${item} -</div> <div class="money">$${prices[item]}</div></div>`);
                total += prices[item];
            }
        }

        cartItem.innerHTML = items.length > 0 ? items.join('<br>') : 'Your cart is empty';
        totalPrice.textContent = `$ ${total.toFixed(2)}`;
    }

    chooseButtons.forEach((button, index) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentIndex < containers.length - 1) {
                currentIndex++;
                window.scrollTo({
                    top: containers[currentIndex].offsetTop,
                    behavior: 'smooth'
                });
            } else {
                if (confirm("You have reached the last step! Click OK to proceed to the next page.")) {
                    proceedToNextPage();
                }
            }
        });
    });

    function proceedToNextPage() {
        // Store selected items in localStorage
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        localStorage.setItem('totalPrice', totalPrice.textContent);

        console.log("Saved Data:", localStorage.getItem('selectedItems')); // Debugging
        console.log("Total Price:", localStorage.getItem('totalPrice'));

        window.location.href = 'nextpage.html';
    }
});
