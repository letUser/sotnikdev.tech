import type { DefineComponent, ComponentOptionsMixin, PublicProps, ExtractPropTypes } from 'vue'

export default interface MenuDict {
  [index: string]: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{}>>, {}, {}>
}