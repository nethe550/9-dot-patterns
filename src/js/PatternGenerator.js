/**
 * @author nethe550
 * @description A class that represents a PatternGenerator which generates combinations of patterns on a DotPattern.
 * @file Contains the PatternGenerator class.
 */

/**
 * Class representing a pattern generator.
 * @class
 */
class PatternGenerator {

    /**
     * Generates a pattern from a DotPattern.
     * @static
     * @function
     * @param {DotPattern} dotPattern - The DotPattern to generate from.
     * @param {PatternType|number} type - The type of pattern to generate.
     * @returns {Pattern|null} - The generated pattern, or if invalid, null.
     */
    static generatePattern(dotPattern, type=PatternType.RANDOM) {

        if (!dotPattern || !dotPattern.dots || !dotPattern.dots.length) return null;

        if (dotPattern.dots.length <= 1) return null;

        switch (type) {

            case PatternType.RANDOM:

                const iterations = Math.round(Math.random() * (dotPattern.dots.length - 4) + 4 );

                const pattern = new Pattern(dotPattern.width, dotPattern.height, []);

                for (let i = 0; i < iterations; i++) {

                    let randomPoint = Math.round(Math.random() * dotPattern.dots.length);

                    while (pattern.pointInPoints(randomPoint)) {
                        randomPoint = Math.round(Math.random() * dotPattern.dots.length);
                    }

                    pattern.points.push(randomPoint);

                }

                if (pattern.isValidPattern()) return pattern;
                else return null;

            case PatternType.MAX_COMPLEXITY:

                // TODO(nethe550): Calculate the max complexity pattern with given width / height (if possible)

                return null;
            
        }

    }

}