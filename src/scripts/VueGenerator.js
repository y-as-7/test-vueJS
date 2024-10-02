import chalk from "chalk";
import BaseGenerator from "./BaseGenerator.js";
import handlebars from "handlebars";
import hbhComparison from "handlebars-helpers/lib/comparison.js";
import hbhString from "handlebars-helpers/lib/string.js";

export default class extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates("common/", [
      // types
      "types/collection.ts",
      "types/error.ts",
      "types/foo.ts",
      "types/item.ts",
      "types/view.ts",

      // utils
      "utils/api.ts",
      "utils/config.ts",
      "utils/date.ts",
      "utils/error.ts",
      "utils/mercure.ts",
    ]);

    this.registerTemplates("vue-common/", [
      // composables
      "composables/mercureItem.ts",
      "composables/mercureList.ts",
    ]);

    this.registerTemplates(`vue/`, [
      // components
      "components/foo/FooCreate.vue",
      "components/foo/FooForm.vue",
      "components/foo/FooList.vue",
      "components/foo/FooShow.vue",
      "components/foo/FooUpdate.vue",

      // common components
      "components/common/FormRepeater.vue",

      // routes
      "router/foo.ts",

      // stores
      "stores/foo/create.ts",
      "stores/foo/delete.ts",
      "stores/foo/list.ts",
      "stores/foo/show.ts",
      "stores/foo/update.ts",

      // types
      "types/stores.ts",

      // views
      "views/foo/ViewCreate.vue",
      "views/foo/ViewList.vue",
      "views/foo/ViewUpdate.vue",
      "views/foo/ViewShow.vue",
    ]);

    handlebars.registerHelper("compare", hbhComparison.compare);
    handlebars.registerHelper("lowercase", hbhString.lowercase);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();

    console.log(
      'Code for the "%s" resource type has been generated!',
      resource.title
    );
    console.log(
      "Paste the following definitions in your application configuration:"
    );
    console.log(
      chalk.green(`
// Import routes
import ${titleLc}Routes from '@/router/${titleLc}';

// Add routes to VueRouter
const router = createRouter({
  // ...
  routes: [
      ...${titleLc}Routes,
  ]
});
`)
    );
  }

  generate(api, resource, dir) {
    const lc = resource.title.toLowerCase();
    const titleUcFirst =
      resource.title.charAt(0).toUpperCase() + resource.title.slice(1);
    const fields = this.parseFields(resource);
    const hasIsRelation = fields.some((field) => field.isRelation);
    const hasIsRelations = fields.some((field) => field.isRelations);
    const hasDateField = fields.some((field) => field.type === "dateTime");

    const context = {
      title: resource.title,
      name: resource.name,
      lc,
      uc: resource.title.toUpperCase(),
      fields,
      formFields: this.buildFields(fields),
      hydraPrefix: this.hydraPrefix,
      titleUcFirst,
      hasIsRelation,
      hasIsRelations,
      hasRelations: hasIsRelation || hasIsRelations,
      hasDateField,
    };

    // Create directories
    // These directories may already exist
    [
      `${dir}/composables`,
      `${dir}/router`,
      `${dir}/types`,
      `${dir}/utils`,
    ].forEach((dir) => this.createDir(dir, false));

    [
      `${dir}/components/${lc}`,
      `${dir}/components/common`,
      `${dir}/stores/${lc}`,
      `${dir}/views/${lc}`,
    ].forEach((dir) => this.createDir(dir));

    [
      // components
      "components/%s/%sCreate.vue",
      "components/%s/%sForm.vue",
      "components/%s/%sList.vue",
      "components/%s/%sShow.vue",
      "components/%s/%sUpdate.vue",

      // router
      "router/%s.ts",

      // stores
      "stores/%s/create.ts",
      "stores/%s/delete.ts",
      "stores/%s/list.ts",
      "stores/%s/show.ts",
      "stores/%s/update.ts",

      // types
      "types/%s.ts",

      // views
      "views/%s/ViewCreate.vue",
      "views/%s/ViewList.vue",
      "views/%s/ViewShow.vue",
      "views/%s/ViewUpdate.vue",
    ].forEach((pattern) =>
      this.createFileFromPattern(pattern, dir, [lc, titleUcFirst], context)
    );

    [
      // components
      "components/common/FormRepeater.vue",

      // composables
      "composables/mercureItem.ts",
      "composables/mercureList.ts",

      // types
      "types/collection.ts",
      "types/error.ts",
      "types/item.ts",
      "types/stores.ts",
      "types/view.ts",

      // utils
      "utils/api.ts",
      "utils/date.ts",
      "utils/error.ts",
      "utils/mercure.ts",
    ].forEach((path) =>
      this.createFile(path, `${dir}/${path}`, context, false)
    );

    // config
    this.createConfigFile(`${dir}/utils/config.ts`, {
      entrypoint: api.entrypoint,
    });
  }

  parseFields(resource) {
    const fields = [
      ...resource.writableFields,
      ...resource.readableFields,
    ].reduce((list, field) => {
      if (list[field.name]) {
        return list;
      }

      const isReferences = Boolean(
        field.reference && field.maxCardinality !== 1
      );
      const isEmbeddeds = Boolean(field.embedded && field.maxCardinality !== 1);

      return {
        ...list,
        [field.name]: {
          ...field,
          isReferences,
          isEmbeddeds,
          isRelation: field.reference || field.embedded,
          isRelations: isEmbeddeds || isReferences,
        },
      };
    }, {});

    return Object.values(fields);
  }
}