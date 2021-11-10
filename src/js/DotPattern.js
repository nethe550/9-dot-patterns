/**
 * @author nethe550
 * @description A class that represents a DotPattern, which renders a dot pattern to a canvas.
 * @file Contains the DotPattern class.
 */

/**
 * Class representing a dot pattern.
 * @class
 */
class DotPattern {

    /**
     * Creates a new dot pattern.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas to draw to.
     * @param {number} width - The number of dots horizontally.
     * @param {number} height - The number of dots vertically.
     * @param {number} radiusCoefficient -  The coefficient of dot radius. Affects this pattern's dots' radii.
     * @param {boolean} coloredDots - Whether or not to color the dots generated in this pattern.
     */
    constructor(canvas, width, height, radiusCoefficient=5, coloredDots=false) {

        /**
         * The canvas to draw to.
         * @type {HTMLCanvasElement}
         */
        this.canvas = canvas;

        /**
         * The canvas context used to draw the dots.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = this.canvas.getContext('2d');

        /**
         * The amount of dots horizontally.
         * @type {number}
         */
        this.width = width;

        /**
         * The amount of dots vertically.
         * @type {number}
         */
        this.height = height;

        /**
         * The array of dot objects that this pattern contains.
         * @type {Dot[]}
         */
         this.dots = [];

         this.generateDots();

        /**
         * Affects the ratio of the dots' radii.
         * @type {number}
         */
        this.radiusCoefficient = radiusCoefficient;

        /**
         * Whether or not to color the dots generated in this pattern.
         * @type {boolean}
         */
        this.coloredDots = coloredDots;

        /**
         * This dot pattern's current pattern.
         * @type {Pattern}
         */
        this.pattern = null;

    }

    /**
     * Converts a coordinate pair into a unique color.
     * @function
     * @param {number} x The x coordinate.
     * @param {number} y The y coordinate.
     * @returns {void}
     */
    convertCoordinatePairToColor(x, y) {

        const normalize = (val) => {

            if (val > 255) return 255;
            else if (val < 0) return 0;
            else return val;

        };

        return `rgb(${ normalize(x / this.width * 255) },${ normalize(((x / this.width) * 255) / ((y / this.height) * 255)) },${ normalize(y / this.height * 255) })`;

    }

    /**
     * Generates the dot objects from the given dimensions.
     * @function
     * @returns {void}
     */
    generateDots() {

        this.dots = [];

        const dotRadius = this.canvas.width > this.canvas.height ? this.canvas.width / this.width / this.radiusCoefficient : this.canvas.height / this.height / this.radiusCoefficient;

        for (let w = 0.5; w < this.width; w++) {

            const dotX = (this.canvas.width / this.width) * w;

            for (let h = 0.5; h < this.height; h++) {

                const dotY = (this.canvas.height / this.height) * h;

                const dot = new Dot({

                    x: dotX,
                    y: dotY,
                    radius: dotRadius

                }, this.coloredDots ? this.convertCoordinatePairToColor(w, h) : '#ffffff');

                this.dots.push(dot);

            }

        }

    }

    /**
     * Draws the dots on the canvas.
     * @function
     * @param {boolean} drawPattern - Should the dot pattern also draw its line pattern?
     * @returns {void}
     */
    draw(drawPattern=false) {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.dots.forEach(dot => dot.draw ? dot.draw(this.ctx) : console.warn(`No draw method on dot:\n${dot}`) );
        
        if (drawPattern) this.drawPattern();

    }

    /**
     * Draws this dot pattern's pattern onto the dots.
     * @function
     * @returns {void}
     */
    drawPattern() {

        if (!this.pattern || !this.pattern.points) return;

        const initialStroke = this.ctx.strokeStyle;
        const initialWidth = this.ctx.lineWidth;

        if (this.coloredDots) {
            const grad = this.ctx.createLinearGradient(this.canvas.width, 0, 0, this.canvas.height);
            grad.addColorStop(0, '#ff0000');
            grad.addColorStop(0.5, '#ff00ff');
            grad.addColorStop(1, '#0000ff');
    
            this.ctx.strokeStyle = grad;
        }
        else {
            this.ctx.strokeStyle = '#ffffff';
        }

        this.ctx.lineWidth = this.radiusCoefficient / 2;
        this.ctx.lineCap = 'round';

        for (let i = 0; i < this.pattern.points.length; i ++) {

            let fromDot = this.getDotByIndex(this.pattern.points[i]);
            if (!fromDot) break;

            let toDot = null;
            
            if (this.pattern.points[i + 1]) toDot = this.getDotByIndex(this.pattern.points[i + 1]);
            if (!toDot) break;

            this.ctx.beginPath();

            this.ctx.moveTo(fromDot.dimensions.x, fromDot.dimensions.y);

            this.ctx.lineTo(toDot.dimensions.x, toDot.dimensions.y);

            this.ctx.stroke();

        }


        this.ctx.lineCap = 'square';
        this.ctx.lineWidth = initialWidth;
        this.ctx.strokeStyle = initialStroke;

    }

    /**
     * Gets a dot by its index.
     * @function
     * @param {number} i - The dot's index to find.
     * @returns {Dot} - The dot at the specified index.
     */
    getDotByIndex(i) {

        return this.dots[i];

    }

}