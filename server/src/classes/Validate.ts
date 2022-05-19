import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength, { IsLengthOptions } from 'validator/lib/isLength';
import isNumeric from 'validator/lib/isNumeric';
import isURL from 'validator/lib/isURL';

export default class Validate {
    /**
     * Returns true if data is a snowflake.
     * @param data Data
     */
    static snowflake(data?: string): boolean {
        if (
            data &&
            !isEmpty(data) &&
            isNumeric(data) &&
            isLength(data, { min: 18, max: 21 })
        )
            return true;
        return false;
    }

    /**
     * Returns true if data is an email.
     * @param data Data
     */
    static email(data?: string): boolean {
        if (data && !isEmpty(data) && isEmail(data)) return true;
        return false;
    }

    /**
     * Returns true if data is not null.
     * @param data Data
     * @param options Length Options
     */
    static string(data?: string, options?: IsLengthOptions): boolean {
        if (data && !isEmpty(data)) {
            if (!options) return true;
            else if (isLength(data, options)) return true;
            else return false;
        }
        return false;
    }

    /**
     * Returns true if data is an url.
     * @param data Data
     */
    static url(data?: string): boolean {
        if (data && !isEmpty(data) && isURL(data)) return true;
        return false;
    }

    /**
     * Returns true if data is a number.
     * @param data Data
     */
    static number(data?: string | number): boolean {
        return !Number.isNaN(data);
    }

    /**
     * Returns true if data is an array.
     * @param data Data
     */
    static array(data?: string): boolean {
        if (
            !data ||
            isEmpty(data) ||
            !(data.startsWith('[') && data.endsWith(']'))
        )
            return false;

        try {
            JSON.parse(data);
            return true;
        } catch (_) {
            return false;
        }
    }
}

export const validateUsername = (data?: string) =>
    Validate.string(data, { min: 3, max: 20 });

export const validatePassword = (data?: string) =>
    Validate.string(data, { min: 8 });
