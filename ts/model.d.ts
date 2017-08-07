type propertyTypeNames = 'string' | 'bool' | 'boolean' | 'integer' | 'int' | 'float' | 'date' | 'time' |
  'timestamp' | 'json';


export type PropertyObject = { [index: string]: any };

export interface INohmModel {
  property(name: string): any;
  property(name: string, value: any): void;
  property(values: PropertyObject): void;
}


declare type PropertyBehaviour = <TModel extends INohmModel>(
  this: TModel,
  newValue: any,
  key: string,
  oldValue: any
) => any;

export interface IModelPropertyDefinition {
  type: propertyTypeNames | PropertyBehaviour;
  defaultValue?: any;
  validations?: Array<any>;
  unique?: boolean;
  /**
   * Whether the property should be indexed. Depending on type this creates different keys/collections.
   * Does not work for all types. TODO: specify here which types.
   * 
   * @type {boolean}
   * @memberof IModelPropertyDefinition
   */
  index?: boolean;
}

export interface IModelPropertyDefinitions {
  [propName: string]: IModelPropertyDefinition;
}

type idGenerators = 'default' | 'increment';

export interface IModelOptions {
  metaCallback?: () => any;
  methods?: {
    [name: string]: () => any;
  };
  properties: IModelPropertyDefinitions;
  publish?: any;
  idGenerator?: idGenerators | (() => any);
}