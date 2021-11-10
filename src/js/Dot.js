/**
 * @author nethe550
 * @description A class that represents a Dot, used by a DotPattern to render a dot pattern to a canvas.
 * @file Contains the Dot class.
 */

/**
 * Class representing a dot.
 * @class
 */
class Dot {

    /**
     * An object containing the (x, y) position and radius of a dot.
     * @typedef {{ x: number, y: number, radius: number }} DotParameters
     */

    /**
     * Creates a new dot.
     * @constructor
     * @param {DotParameters} dimensions - The dot's dimensions.
     * @param {string} color - The dot's color (default: #ffffff).
     */
    constructor(dimensions, color="#ffffff") {

        /**
         * The dimensions and position of the dot.
         * @type {DotParameters}
         */
        this.dimensions = dimensions;

        /**
         * The color of the dot. (Any valid CSS color)
         * @type {string}
         */
        this.color = color;

    }

    /**
     * Draws the dot with the given dimensions.
     * @function
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw to.
     * @returns {void}
     */
    draw(ctx) {

        /**
         * The initial ctx fill style.
         * @constant
         * @type {string}
         */
        const initialFill = ctx.fillStyle;

        ctx.fillStyle = this.color ? this.color : "#ffffff";

        ctx.beginPath();

        ctx.arc(this.dimensions.x,
                this.dimensions.y,
                this.dimensions.radius,
                0,
                Math.PI * 2,
                false);

        ctx.fill();

        ctx.fillStyle = initialFill;

    }

}