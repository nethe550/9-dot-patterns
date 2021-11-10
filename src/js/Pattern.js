/**
 * @author nethe550
 * @description A class that represents a Pattern, used by a PatternGenerator to generate a pattern to be displayed on a DotPattern.
 * @file Contains the Pattern class.
 */

/**
 * Class representing a pattern.
 * @class
 */
class Pattern {

    /**
     * Creates a new pattern.
     * @constructor
     * @param {number} width - The width of the DotPattern this pattern belongs to.
     * @param {number} height - The height of the DotPattern this pattern belongs to.
     * @param {number[]} points - The points which this pattern connects, in order.
     */
    constructor(width, height, points=[]) {

        /**
         * The width of the DotPattern this pattern belongs to.
         * @type {number}
         */
        this.width = width;

        /**
         * The height of the DotPattern this pattern belongs to.
         * @type {number}
         */
        this.height = height;

        /**
         * The points which this pattern connects, in order.
         * @type {number[]}
         */
        this.points = points || [];

    }

    /**
     * Checks if a point is within this pattern's points.
     * @param {number} point - The point to check
     * @returns {boolean} - Is the point within this pattern's points?
     */
    pointInPoints(point) {

        for (let i = 0; i < this.points.length; i++) {

            if (this.points[i] == point) return true;
        
        }

        return false;

    }

    /**
     * Checks if this pattern is a valid pattern.
     * @returns {boolean} - Is this a valid pattern?
     */
    isValidPattern() {
    
        // TODO(nethe550): Check for intermediate points and minimum of 4 connections to validate this is a valid pattern

        return true;

    }

}