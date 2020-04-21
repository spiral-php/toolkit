import sf from '@spiral-toolkit/core';

const {CUSTOM_INPUT_TARGET_ATTR} = sf.constants;

export class PatternInput extends sf.core.BaseDOMConstructor {
    static spiralFrameworkName = 'pattern-input';
    static spiralFrameworkCssClass = 'js-sf-pattern-input';

    name = PatternInput.spiralFrameworkName;
    static defaultOptions = {
        value: '',
    }

    optionsToGrab = {
        value: {
            value: PatternInput.defaultOptions.value,
            domAttr: 'data-value',
        },
        name: {
            value: PatternInput.defaultOptions.name,
            domAttr: 'data-name',
        },
    };

    options = {...PatternInput.defaultOptions};
    chars = [];

    constructor(ssf, node, options) {
        super();
        this.init(ssf, node, options);
        this.onInput = this.onInput.bind(this);
        this.serialInput = node.querySelector(`[${CUSTOM_INPUT_TARGET_ATTR}]`);
        [...node.querySelectorAll('input[data-pattern-char], input[data-pattern-digit]')].forEach((el) => {
            this.chars.push(el);
            el.addEventListener('input', this.onInput);
            el.addEventListener('focus', () => el.setSelectionRange(0, 1));
        });
        this.serialInput.sfSetValue = (value) => {
            this.setValue(this.chars[0], value);
        }
    }

    nextInput(node) {
        const n = this.chars.indexOf(node);
        if (n < this.chars.length - 1) {
            return this.chars[n + 1];
        }
    }

    prevInput(node) {
        const n = this.chars.indexOf(node);
        if (n > 0) {
            return this.chars[n - 1];
        }
    }

    calcValue() {
        let value = '';
        this.chars.forEach((el) => {
            value += el.value;
        });
        this.serialInput.value = value;
    }

    setValue(target, value) {
        const isDigit = target.hasAttribute('data-pattern-digit');
        let char = value.charAt(0);
        if (isDigit) {
            char = char.replace(/\D/g, '');
        }
        const rest = value.substr(1);
        target.value = char.toUpperCase();

        if (char) {
            const next = this.nextInput(target);
            if (next) {
                next.focus();
                if (rest.length) {
                    this.setValue(next, rest);
                }
            } else {
                target.blur();
            }
            this.calcValue();
        }
    }

    onInput(e) {
        const target = e.target;
        this.setValue(e.target, e.target.value.trim());
    }

    die() {
        this.chars.forEach((el) => {
            el.removeEventListener('input', this.onInput);
        });
    }
}

sf.registerInstanceType(PatternInput, PatternInput.spiralFrameworkCssClass);