# Stylelint Rules

´´´json
  {
    "extends": [
      "stylelint-config-standard",
      "stylelint-config-sass-guidelines",
      "stylelint-config-standard-scss"  ],
    "plugins": [
      "stylelint-order"
    ],
    "ignoreFiles": [
      "node_modules/**/*",
      "dist/**/*",
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
      "**/*.html",
      "**/*.scss.map",
      "**/*.sass",
      "**/*.json",
      "**/*.ico",
      "**/*.md",
      "**/images/**",
      "**/icons/**",
      "**/fonts/**"
    ],
    "overrides": [
      {
        "files": ["*.scss", "**/*.scss"],
        "customSyntax": "postcss-scss",
        "extends": [
          "stylelint-config-idiomatic-order",
          "stylelint-config-standard-scss"
        ]
      }
    ],
    "rules": {
      "at-rule-no-unknown": null,
      "scss/at-rule-no-unknown": [
        true,
        {
          "ignoreAtRules": [
            "function",
            "if",
            "each",
            "use",
            "include",
            "mixin"
          ]
        }
      ],
      "at-rule-allowed-list": [
        "extend",
        "keyframes",
        "use",
        "import",
        "function",
        "if",
        "each",
        "use",
        "include",
        "mixin"
      ],
      "block-no-empty": true,
      "order/properties-alphabetical-order": null,
      "color-no-invalid-hex": true,
      "color-named": "never",
      "color-hex-case": "upper",
      "color-hex-length": "long",
      "function-disallowed-list": [
        "rgb",
        "hsl"
      ],
      "declaration-block-no-duplicate-properties": [
        true,
        {
          "ignore": [
            "consecutive-duplicates-with-different-values"
          ]
        }
      ],
      "comment-no-empty": true,
      "custom-property-no-missing-var-function": true,
      "declaration-block-no-duplicate-custom-properties": true,

      "declaration-block-no-shorthand-property-overrides": true,
      "font-family-no-duplicate-names": true,
      "font-family-no-missing-generic-family-keyword": true,
      "function-calc-no-unspaced-operator": true,
      "function-linear-gradient-no-nonstandard-direction": true,
      "function-no-unknown": true,
      "keyframe-declaration-no-important": true,
      "media-feature-name-no-unknown": true,
      "named-grid-areas-no-invalid": null,
      "no-descending-specificity": true,
      "no-duplicate-at-import-rules": true,
      "no-duplicate-selectors": true,
      "no-empty-source": true,
      "no-extra-semicolons": true,
      "no-invalid-double-slash-comments": true,
      "no-invalid-position-at-import-rule": [
        true,
        {
          "ignoreAtRules": [
            "extend",
            "keyframes",
            "use"
          ]
        }
      ],
      "no-irregular-whitespace": true,
      "scss/dollar-variable-pattern": "^[a-z\\d](?:[a-z\\d]|-(?=[a-z\\d]))*$",
      "scss/selector-no-redundant-nesting-selector": true,
      "selector-pseudo-class-no-unknown": true,
      "selector-pseudo-element-no-unknown": true,
      "selector-type-no-unknown": [
        true,
        {
          "ignore": [
            "custom-elements"
          ]
        }
      ],
      "string-no-newline": true,
      "alpha-value-notation": [
        "number",
        {
          "exceptProperties": [
            "background-color"
          ]
        }
      ],
      "at-rule-empty-line-before": [
        "always",
        {
          "except": [
            "blockless-after-same-name-blockless",
            "first-nested"
          ],
          "ignore": [
            "after-comment"
          ]
        }
      ],
      "at-rule-name-case": "lower",
      "at-rule-name-space-after": "always-single-line",
      "at-rule-no-vendor-prefix": true,
      "at-rule-semicolon-newline-after": "always",
      "block-closing-brace-empty-line-before": "never",
      "block-closing-brace-newline-after": "always",
      "block-closing-brace-newline-before": "always-multi-line",
      "block-closing-brace-space-before": "always-single-line",
      "block-opening-brace-newline-after": "always-multi-line",
      "block-opening-brace-space-after": "always-single-line",
      "block-opening-brace-space-before": "always",
      "color-function-notation": "modern",
      "comment-empty-line-before": [
        "always",
        {
          "except": [
            "first-nested"
          ],
          "ignore": [
            "stylelint-commands"
          ]
        }
      ],
      "comment-whitespace-inside": "always",
      "custom-property-empty-line-before": [
        "always",
        {
          "except": [
            "after-custom-property",
            "first-nested"
          ],
          "ignore": [
            "after-comment",
            "inside-single-line-block"
          ]
        }
      ],
      "custom-media-pattern": [
        "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
        {
          "message": "Expected custom media query name to be kebab-case"
        }
      ],
      "custom-property-pattern": [
        "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
        {
          "message": "Expected custom property name to be kebab-case"
        }
      ],
      "declaration-bang-space-after": "never",
      "declaration-bang-space-before": "always",
      "declaration-block-semicolon-newline-after": "always-multi-line",
      "declaration-block-semicolon-space-after": "always-single-line",
      "declaration-block-semicolon-space-before": "never",
      "declaration-block-single-line-max-declarations": 1,
      "declaration-block-trailing-semicolon": "always",
      "declaration-block-no-redundant-longhand-properties": true,
      "declaration-colon-newline-after": "always-multi-line",
      "declaration-colon-space-after": "always-single-line",
      "declaration-colon-space-before": "never",
      "declaration-empty-line-before": [
        "always",
        {
          "except": [
            "after-declaration",
            "first-nested"
          ],
          "ignore": [
            "after-comment",
            "inside-single-line-block"
          ]
        }
      ],
      "declaration-property-unit-allowed-list": {
        "/^border(?!.*-radius$)/": [
          "px",
          "%"
        ],
        "/^border-radius/": [
          "px",
          "rem",
          "%"
        ],
        "/^box-shadow": [
          "px"
        ],
        "/^margin/": [
          "px",
          "rem"
        ],
        "/^padding/": [
          "px",
          "rem"
        ],
        "font-size": [
          "rem",
          "em"
        ],
        "height": [
          "px",
          "rem",
          "%",
          "vh"
        ],
        "width": [
          "px",
          "rem",
          "%",
          "vw"
        ],
        "background-color": [
          "/^\\$/",
          "/^rgba\\(\\$[a-z][a-z0-9\\-]+,\\s\\.\\d+\\)$/",
          "currentcolor",
          "inherit",
          "transparent",
          "unset"
        ],
        "color": [
          "/^\\$/",
          "/^rgba\\(\\$[a-z][a-z0-9\\-]+,\\s\\.\\d+\\)$/",
          "inherit",
          "transparent",
          "unset",
          "currentColor"
        ]
      },
      "font-family-name-quotes": "always-where-recommended",
      "function-comma-newline-after": "always-multi-line",
      "function-comma-space-after": "always-single-line",
      "function-comma-space-before": "never",
      "function-max-empty-lines": 0,
      "function-name-case": "lower",
      "function-parentheses-newline-inside": "always-multi-line",
      "function-parentheses-space-inside": "never-single-line",
      "function-url-quotes": "always",
      "function-whitespace-after": "always",
      "hue-degree-notation": "angle",
      "indentation": 2,
      "keyframes-name-pattern": [
        "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
        {
          "message": "Expected keyframe name to be kebab-case"
        }
      ],
      "length-zero-no-unit": true,
      "max-empty-lines": 1,
      "max-line-length": 120,
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-case": "lower",
      "media-feature-name-no-vendor-prefix": true,
      "media-feature-parentheses-space-inside": "never",
      "media-feature-range-operator-space-after": "always",
      "media-feature-range-operator-space-before": "always",
      "media-query-list-comma-newline-after": "always-multi-line",
      "media-query-list-comma-space-after": "always-single-line",
      "media-query-list-comma-space-before": "never",
      "no-empty-first-line": true,
      "no-eol-whitespace": true,
      "no-missing-end-of-source-newline": true,
      "number-leading-zero": "always",
      "number-max-precision": 4,
      "number-no-trailing-zeros": true,
      "property-case": "lower",
      "property-no-vendor-prefix": true,
      "rule-empty-line-before": [
        "always-multi-line",
        {
          "except": [
            "first-nested"
          ],
          "ignore": [
            "after-comment"
          ]
        }
      ],
      "selector-attribute-brackets-space-inside": "never",
      "selector-attribute-operator-space-after": "never",
      "selector-attribute-operator-space-before": "never",
      "selector-attribute-quotes": "always",
      "selector-class-pattern": [
        "^[a-z0-9-]+(__[a-z0-9-]+)?(--[a-z0-9-]+)?$",
        {
          "message": "Please follow BEM naming conventions",
          "resolveNestedSelectors": true
        }
      ],
      "selector-max-compound-selectors": [
        2,
        {
          "message": "Descendent selectors break encapsulation and are bad for performance. Please try using BEM class names instead and nesting/combining them with &",
          "severity": "warning"
        }
      ],
      "selector-combinator-space-after": "always",
      "selector-combinator-space-before": "always",
      "selector-descendant-combinator-no-non-space": true,
      "selector-id-pattern": [
        "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
        {
          "message": "Expected id selector to be kebab-case"
        }
      ],
      "selector-list-comma-newline-after": "always",
      "selector-list-comma-space-before": "never",
      "selector-max-empty-lines": 0,
      "selector-no-vendor-prefix": true,
      "selector-pseudo-class-parentheses-space-inside": "never",
      "selector-pseudo-element-case": "lower",
      "selector-pseudo-element-colon-notation": "double",
      "selector-type-case": "lower",
      "shorthand-property-no-redundant-values": true,
      "string-quotes": "double",
      "unit-case": "lower",
      "value-keyword-case": "lower",
      "value-list-comma-newline-after": "always-multi-line",
      "value-list-comma-space-after": "always-single-line",
      "value-list-comma-space-before": "never",
      "value-list-max-empty-lines": 0,
      "value-no-vendor-prefix": true,
      "selector-pseudo-class-case": null,
      "property-no-unknown": [
        true,
        {
          "ignoreProperties": [
            "composes",
            "r"
          ]
        }
      ],
      "unit-no-unknown": [
        true,
        {
          "ignoreUnits": [
            "x"
          ]
        }
      ],
      "scss/at-import-partial-extension-blacklist": null
    }
  }
```
