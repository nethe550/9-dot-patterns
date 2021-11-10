/**
 * @author nethe550
 * @description The entrypoint of execution, and drives the function of the page.
 */

/**
 * The canvas element to render to.
 * @constant
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('c');

/**
 * The canvas's wrapper element.
 * @constant
 * @type {HTMLDivElement}
 */
const canvasWrapper = document.getElementById('canvas-wrapper');

/**
 * The size input slider element.
 * @constant
 * @type {HTMLInputElement}
 */
const sizeSlider = document.getElementById('size-slider');

/**
 * The draw pattern button element.
 * @constant
 * @type {HTMLButtonElement}
 */
const drawPatternButton = document.getElementById('draw-pattern');

/**
 * The color toggle input element.
 * @constant
 * @type {HTMLInputElement}
 */
const toggleColorInput = document.getElementById('toggle-color');

/**
 * The root of the document.
 * @constant
 * @type {HTMLElement}
 */
const root = document.querySelector(':root');

/**
 * The global pattern displayed on the page.
 * @type {DotPattern}
 */
let pattern = new DotPattern(canvas, 3, 3, 5, false);

/**
 * Toggles the dot pattern's color.
 * @function
 * @returns {void}
 */
function toggleColor() {

    let oldPattern = null;
    if (pattern.pattern) oldPattern = pattern.pattern;

    if (pattern.coloredDots) pattern = new DotPattern(canvas, parseInt(sizeSlider.value), parseInt(sizeSlider.value), 5, false);
    else pattern = new DotPattern(canvas, parseInt(sizeSlider.value), parseInt(sizeSlider.value), 5, true);

    pattern.generateDots();
    if (oldPattern) pattern.pattern = oldPattern;

    pattern.draw();

    pattern.draw(true);

}

// register toggleColor to change event on toggleColorInput
toggleColorInput.addEventListener('change', toggleColor);

/**
 * Draws the dot pattern's pattern.
 * @function
 * @returns {void}
 */
function drawPattern() {

    // TODO(nethe550): Add support for more patterns

    pattern.pattern = PatternGenerator.generatePattern(pattern, PatternType.RANDOM);

    pattern.draw();

    pattern.draw(true);

}

// register drawPattern to click event on drawPatternButton
drawPatternButton.addEventListener('click', drawPattern);

/**
 * Updates the dot pattern and recalculates canvas dimensions.
 * @function
 * @returns {void}
 */
function updateSizeSlider() {

    pattern = new DotPattern(canvas, parseInt(sizeSlider.value), parseInt(sizeSlider.value), 5, pattern.coloredDots);

    updateCanvas();

}

// register updateSizeSlider to change event on sizeSlider
sizeSlider.addEventListener('change', updateSizeSlider);

/**
 * Updates relevant dimensions of canvas and pattern.
 * @function
 * @returns {void}
 */
function updateCanvas() {

    if (window.innerWidth > window.innerHeight) {
        root.style.setProperty('--canvas-dimension', '50vh');
    }
    else {
        root.style.setProperty('--canvas-dimension', '50vw');
    }

    canvasWrapper.style.width = 'var(--canvas-dimension)';
    canvasWrapper.style.height = 'var(--canvas-dimension)';

    canvas.width = canvasWrapper.clientWidth;
    canvas.height = canvasWrapper.clientWidth;

    pattern.generateDots();
    pattern.draw();

}

// register updateCanvas to content loaded and resize events
window.addEventListener('DOMContentLoaded', updateCanvas);
window.addEventListener('resize', updateCanvas);