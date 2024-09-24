const panel = document.querySelector('.control-panel');
const grid = document.querySelector('.grid-container');
const slider = document.querySelector('#slider');
const clear = document.querySelector('#clear');
const colorBtn = document.querySelector('#color');
const rainbowBtn = document.querySelector('#rainbow');
let output = document.querySelector('#gridLabel');

panel.appendChild(slider);

let isRainbow = false;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Event listeners for the buttons
rainbowBtn.addEventListener('click', () => {
    isRainbow = true;
});

slider.addEventListener('input', () => {
    let gridSize = slider.value;
    grid.innerHTML = '';
    output.textContent = `Grid Size: ${gridSize} x ${gridSize}`;

    for (let i = 1; i <= gridSize * gridSize; i++) {
        let gridItem = document.createElement('div');
        gridItem.className = "gridItem";
        grid.appendChild(gridItem);

        // Function for generating rainbow colors
        function rainbowMode() {
            let letters = "0123456789ABCDEF";
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Add coloring behavior
        gridItem.addEventListener('mouseover', () => {
            if (mouseDown) {
                gridItem.style.background = isRainbow ? rainbowMode() : colorBtn.value;
            }
        });

        gridItem.addEventListener('mousedown', () => {
            gridItem.style.background = isRainbow ? rainbowMode() : colorBtn.value;
        });
    }

    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
});

// Clear button event
clear.addEventListener('click', () => {
    document.querySelectorAll('.gridItem').forEach(item => {
        item.style.background = "white";
    });
});
