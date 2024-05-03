import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import presetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

export default {
    plugins: [
        postcssImport,
        postcssNested,
        postcssMixins,
        precss,
        autoprefixer,
        presetEnv({ stage: 1 }),
        cssnano({ preset: 'default' })
    ]
};
