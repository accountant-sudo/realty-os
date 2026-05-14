
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model Realtor
 * 
 */
export type Realtor = $Result.DefaultSelection<Prisma.$RealtorPayload>
/**
 * Model MlsProperty
 * 
 */
export type MlsProperty = $Result.DefaultSelection<Prisma.$MlsPropertyPayload>
/**
 * Model Operation
 * 
 */
export type Operation = $Result.DefaultSelection<Prisma.$OperationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.realtor`: Exposes CRUD operations for the **Realtor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Realtors
    * const realtors = await prisma.realtor.findMany()
    * ```
    */
  get realtor(): Prisma.RealtorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mlsProperty`: Exposes CRUD operations for the **MlsProperty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MlsProperties
    * const mlsProperties = await prisma.mlsProperty.findMany()
    * ```
    */
  get mlsProperty(): Prisma.MlsPropertyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operation`: Exposes CRUD operations for the **Operation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operations
    * const operations = await prisma.operation.findMany()
    * ```
    */
  get operation(): Prisma.OperationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Agent: 'Agent',
    Realtor: 'Realtor',
    MlsProperty: 'MlsProperty',
    Operation: 'Operation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "agent" | "realtor" | "mlsProperty" | "operation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      Realtor: {
        payload: Prisma.$RealtorPayload<ExtArgs>
        fields: Prisma.RealtorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RealtorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RealtorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>
          }
          findFirst: {
            args: Prisma.RealtorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RealtorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>
          }
          findMany: {
            args: Prisma.RealtorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>[]
          }
          create: {
            args: Prisma.RealtorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>
          }
          createMany: {
            args: Prisma.RealtorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RealtorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>[]
          }
          delete: {
            args: Prisma.RealtorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>
          }
          update: {
            args: Prisma.RealtorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>
          }
          deleteMany: {
            args: Prisma.RealtorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RealtorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RealtorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>[]
          }
          upsert: {
            args: Prisma.RealtorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RealtorPayload>
          }
          aggregate: {
            args: Prisma.RealtorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRealtor>
          }
          groupBy: {
            args: Prisma.RealtorGroupByArgs<ExtArgs>
            result: $Utils.Optional<RealtorGroupByOutputType>[]
          }
          count: {
            args: Prisma.RealtorCountArgs<ExtArgs>
            result: $Utils.Optional<RealtorCountAggregateOutputType> | number
          }
        }
      }
      MlsProperty: {
        payload: Prisma.$MlsPropertyPayload<ExtArgs>
        fields: Prisma.MlsPropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MlsPropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MlsPropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>
          }
          findFirst: {
            args: Prisma.MlsPropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MlsPropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>
          }
          findMany: {
            args: Prisma.MlsPropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>[]
          }
          create: {
            args: Prisma.MlsPropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>
          }
          createMany: {
            args: Prisma.MlsPropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MlsPropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>[]
          }
          delete: {
            args: Prisma.MlsPropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>
          }
          update: {
            args: Prisma.MlsPropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>
          }
          deleteMany: {
            args: Prisma.MlsPropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MlsPropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MlsPropertyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>[]
          }
          upsert: {
            args: Prisma.MlsPropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MlsPropertyPayload>
          }
          aggregate: {
            args: Prisma.MlsPropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMlsProperty>
          }
          groupBy: {
            args: Prisma.MlsPropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<MlsPropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.MlsPropertyCountArgs<ExtArgs>
            result: $Utils.Optional<MlsPropertyCountAggregateOutputType> | number
          }
        }
      }
      Operation: {
        payload: Prisma.$OperationPayload<ExtArgs>
        fields: Prisma.OperationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          findFirst: {
            args: Prisma.OperationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          findMany: {
            args: Prisma.OperationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>[]
          }
          create: {
            args: Prisma.OperationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          createMany: {
            args: Prisma.OperationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>[]
          }
          delete: {
            args: Prisma.OperationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          update: {
            args: Prisma.OperationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          deleteMany: {
            args: Prisma.OperationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>[]
          }
          upsert: {
            args: Prisma.OperationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationPayload>
          }
          aggregate: {
            args: Prisma.OperationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperation>
          }
          groupBy: {
            args: Prisma.OperationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperationCountArgs<ExtArgs>
            result: $Utils.Optional<OperationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    agent?: AgentOmit
    realtor?: RealtorOmit
    mlsProperty?: MlsPropertyOmit
    operation?: OperationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: string | null
    name: string | null
    initials: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    role: string | null
    name: string | null
    initials: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    name: number
    initials: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    name?: true
    initials?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    name?: true
    initials?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    name?: true
    initials?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    role: string
    name: string
    initials: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    initials?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    initials?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    initials?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    initials?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "name" | "initials" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      role: string
      name: string
      initials: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly initials: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    active: number | null
    closed: number | null
  }

  export type AgentSumAggregateOutputType = {
    active: number | null
    closed: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    name: string | null
    active: number | null
    closed: number | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    active: number | null
    closed: number | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    name: number
    active: number
    closed: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    active?: true
    closed?: true
  }

  export type AgentSumAggregateInputType = {
    active?: true
    closed?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    name?: true
    active?: true
    closed?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    name?: true
    active?: true
    closed?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    name?: true
    active?: true
    closed?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    name: string
    active: number
    closed: number
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    active?: boolean
    closed?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    active?: boolean
    closed?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    active?: boolean
    closed?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    name?: boolean
    active?: boolean
    closed?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "active" | "closed", ExtArgs["result"]["agent"]>

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      active: number
      closed: number
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly active: FieldRef<"Agent", 'Int'>
    readonly closed: FieldRef<"Agent", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
  }


  /**
   * Model Realtor
   */

  export type AggregateRealtor = {
    _count: RealtorCountAggregateOutputType | null
    _min: RealtorMinAggregateOutputType | null
    _max: RealtorMaxAggregateOutputType | null
  }

  export type RealtorMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type RealtorMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type RealtorCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type RealtorMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type RealtorMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type RealtorCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type RealtorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Realtor to aggregate.
     */
    where?: RealtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realtors to fetch.
     */
    orderBy?: RealtorOrderByWithRelationInput | RealtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RealtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Realtors
    **/
    _count?: true | RealtorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RealtorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RealtorMaxAggregateInputType
  }

  export type GetRealtorAggregateType<T extends RealtorAggregateArgs> = {
        [P in keyof T & keyof AggregateRealtor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRealtor[P]>
      : GetScalarType<T[P], AggregateRealtor[P]>
  }




  export type RealtorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RealtorWhereInput
    orderBy?: RealtorOrderByWithAggregationInput | RealtorOrderByWithAggregationInput[]
    by: RealtorScalarFieldEnum[] | RealtorScalarFieldEnum
    having?: RealtorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RealtorCountAggregateInputType | true
    _min?: RealtorMinAggregateInputType
    _max?: RealtorMaxAggregateInputType
  }

  export type RealtorGroupByOutputType = {
    id: string
    name: string
    _count: RealtorCountAggregateOutputType | null
    _min: RealtorMinAggregateOutputType | null
    _max: RealtorMaxAggregateOutputType | null
  }

  type GetRealtorGroupByPayload<T extends RealtorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RealtorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RealtorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RealtorGroupByOutputType[P]>
            : GetScalarType<T[P], RealtorGroupByOutputType[P]>
        }
      >
    >


  export type RealtorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["realtor"]>

  export type RealtorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["realtor"]>

  export type RealtorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["realtor"]>

  export type RealtorSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type RealtorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["realtor"]>

  export type $RealtorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Realtor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["realtor"]>
    composites: {}
  }

  type RealtorGetPayload<S extends boolean | null | undefined | RealtorDefaultArgs> = $Result.GetResult<Prisma.$RealtorPayload, S>

  type RealtorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RealtorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RealtorCountAggregateInputType | true
    }

  export interface RealtorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Realtor'], meta: { name: 'Realtor' } }
    /**
     * Find zero or one Realtor that matches the filter.
     * @param {RealtorFindUniqueArgs} args - Arguments to find a Realtor
     * @example
     * // Get one Realtor
     * const realtor = await prisma.realtor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RealtorFindUniqueArgs>(args: SelectSubset<T, RealtorFindUniqueArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Realtor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RealtorFindUniqueOrThrowArgs} args - Arguments to find a Realtor
     * @example
     * // Get one Realtor
     * const realtor = await prisma.realtor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RealtorFindUniqueOrThrowArgs>(args: SelectSubset<T, RealtorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Realtor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorFindFirstArgs} args - Arguments to find a Realtor
     * @example
     * // Get one Realtor
     * const realtor = await prisma.realtor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RealtorFindFirstArgs>(args?: SelectSubset<T, RealtorFindFirstArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Realtor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorFindFirstOrThrowArgs} args - Arguments to find a Realtor
     * @example
     * // Get one Realtor
     * const realtor = await prisma.realtor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RealtorFindFirstOrThrowArgs>(args?: SelectSubset<T, RealtorFindFirstOrThrowArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Realtors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Realtors
     * const realtors = await prisma.realtor.findMany()
     * 
     * // Get first 10 Realtors
     * const realtors = await prisma.realtor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const realtorWithIdOnly = await prisma.realtor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RealtorFindManyArgs>(args?: SelectSubset<T, RealtorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Realtor.
     * @param {RealtorCreateArgs} args - Arguments to create a Realtor.
     * @example
     * // Create one Realtor
     * const Realtor = await prisma.realtor.create({
     *   data: {
     *     // ... data to create a Realtor
     *   }
     * })
     * 
     */
    create<T extends RealtorCreateArgs>(args: SelectSubset<T, RealtorCreateArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Realtors.
     * @param {RealtorCreateManyArgs} args - Arguments to create many Realtors.
     * @example
     * // Create many Realtors
     * const realtor = await prisma.realtor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RealtorCreateManyArgs>(args?: SelectSubset<T, RealtorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Realtors and returns the data saved in the database.
     * @param {RealtorCreateManyAndReturnArgs} args - Arguments to create many Realtors.
     * @example
     * // Create many Realtors
     * const realtor = await prisma.realtor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Realtors and only return the `id`
     * const realtorWithIdOnly = await prisma.realtor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RealtorCreateManyAndReturnArgs>(args?: SelectSubset<T, RealtorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Realtor.
     * @param {RealtorDeleteArgs} args - Arguments to delete one Realtor.
     * @example
     * // Delete one Realtor
     * const Realtor = await prisma.realtor.delete({
     *   where: {
     *     // ... filter to delete one Realtor
     *   }
     * })
     * 
     */
    delete<T extends RealtorDeleteArgs>(args: SelectSubset<T, RealtorDeleteArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Realtor.
     * @param {RealtorUpdateArgs} args - Arguments to update one Realtor.
     * @example
     * // Update one Realtor
     * const realtor = await prisma.realtor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RealtorUpdateArgs>(args: SelectSubset<T, RealtorUpdateArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Realtors.
     * @param {RealtorDeleteManyArgs} args - Arguments to filter Realtors to delete.
     * @example
     * // Delete a few Realtors
     * const { count } = await prisma.realtor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RealtorDeleteManyArgs>(args?: SelectSubset<T, RealtorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Realtors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Realtors
     * const realtor = await prisma.realtor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RealtorUpdateManyArgs>(args: SelectSubset<T, RealtorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Realtors and returns the data updated in the database.
     * @param {RealtorUpdateManyAndReturnArgs} args - Arguments to update many Realtors.
     * @example
     * // Update many Realtors
     * const realtor = await prisma.realtor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Realtors and only return the `id`
     * const realtorWithIdOnly = await prisma.realtor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RealtorUpdateManyAndReturnArgs>(args: SelectSubset<T, RealtorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Realtor.
     * @param {RealtorUpsertArgs} args - Arguments to update or create a Realtor.
     * @example
     * // Update or create a Realtor
     * const realtor = await prisma.realtor.upsert({
     *   create: {
     *     // ... data to create a Realtor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Realtor we want to update
     *   }
     * })
     */
    upsert<T extends RealtorUpsertArgs>(args: SelectSubset<T, RealtorUpsertArgs<ExtArgs>>): Prisma__RealtorClient<$Result.GetResult<Prisma.$RealtorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Realtors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorCountArgs} args - Arguments to filter Realtors to count.
     * @example
     * // Count the number of Realtors
     * const count = await prisma.realtor.count({
     *   where: {
     *     // ... the filter for the Realtors we want to count
     *   }
     * })
    **/
    count<T extends RealtorCountArgs>(
      args?: Subset<T, RealtorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RealtorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Realtor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RealtorAggregateArgs>(args: Subset<T, RealtorAggregateArgs>): Prisma.PrismaPromise<GetRealtorAggregateType<T>>

    /**
     * Group by Realtor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RealtorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RealtorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RealtorGroupByArgs['orderBy'] }
        : { orderBy?: RealtorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RealtorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRealtorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Realtor model
   */
  readonly fields: RealtorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Realtor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RealtorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Realtor model
   */
  interface RealtorFieldRefs {
    readonly id: FieldRef<"Realtor", 'String'>
    readonly name: FieldRef<"Realtor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Realtor findUnique
   */
  export type RealtorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * Filter, which Realtor to fetch.
     */
    where: RealtorWhereUniqueInput
  }

  /**
   * Realtor findUniqueOrThrow
   */
  export type RealtorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * Filter, which Realtor to fetch.
     */
    where: RealtorWhereUniqueInput
  }

  /**
   * Realtor findFirst
   */
  export type RealtorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * Filter, which Realtor to fetch.
     */
    where?: RealtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realtors to fetch.
     */
    orderBy?: RealtorOrderByWithRelationInput | RealtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Realtors.
     */
    cursor?: RealtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Realtors.
     */
    distinct?: RealtorScalarFieldEnum | RealtorScalarFieldEnum[]
  }

  /**
   * Realtor findFirstOrThrow
   */
  export type RealtorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * Filter, which Realtor to fetch.
     */
    where?: RealtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realtors to fetch.
     */
    orderBy?: RealtorOrderByWithRelationInput | RealtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Realtors.
     */
    cursor?: RealtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Realtors.
     */
    distinct?: RealtorScalarFieldEnum | RealtorScalarFieldEnum[]
  }

  /**
   * Realtor findMany
   */
  export type RealtorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * Filter, which Realtors to fetch.
     */
    where?: RealtorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Realtors to fetch.
     */
    orderBy?: RealtorOrderByWithRelationInput | RealtorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Realtors.
     */
    cursor?: RealtorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Realtors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Realtors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Realtors.
     */
    distinct?: RealtorScalarFieldEnum | RealtorScalarFieldEnum[]
  }

  /**
   * Realtor create
   */
  export type RealtorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * The data needed to create a Realtor.
     */
    data: XOR<RealtorCreateInput, RealtorUncheckedCreateInput>
  }

  /**
   * Realtor createMany
   */
  export type RealtorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Realtors.
     */
    data: RealtorCreateManyInput | RealtorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Realtor createManyAndReturn
   */
  export type RealtorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * The data used to create many Realtors.
     */
    data: RealtorCreateManyInput | RealtorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Realtor update
   */
  export type RealtorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * The data needed to update a Realtor.
     */
    data: XOR<RealtorUpdateInput, RealtorUncheckedUpdateInput>
    /**
     * Choose, which Realtor to update.
     */
    where: RealtorWhereUniqueInput
  }

  /**
   * Realtor updateMany
   */
  export type RealtorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Realtors.
     */
    data: XOR<RealtorUpdateManyMutationInput, RealtorUncheckedUpdateManyInput>
    /**
     * Filter which Realtors to update
     */
    where?: RealtorWhereInput
    /**
     * Limit how many Realtors to update.
     */
    limit?: number
  }

  /**
   * Realtor updateManyAndReturn
   */
  export type RealtorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * The data used to update Realtors.
     */
    data: XOR<RealtorUpdateManyMutationInput, RealtorUncheckedUpdateManyInput>
    /**
     * Filter which Realtors to update
     */
    where?: RealtorWhereInput
    /**
     * Limit how many Realtors to update.
     */
    limit?: number
  }

  /**
   * Realtor upsert
   */
  export type RealtorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * The filter to search for the Realtor to update in case it exists.
     */
    where: RealtorWhereUniqueInput
    /**
     * In case the Realtor found by the `where` argument doesn't exist, create a new Realtor with this data.
     */
    create: XOR<RealtorCreateInput, RealtorUncheckedCreateInput>
    /**
     * In case the Realtor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RealtorUpdateInput, RealtorUncheckedUpdateInput>
  }

  /**
   * Realtor delete
   */
  export type RealtorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
    /**
     * Filter which Realtor to delete.
     */
    where: RealtorWhereUniqueInput
  }

  /**
   * Realtor deleteMany
   */
  export type RealtorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Realtors to delete
     */
    where?: RealtorWhereInput
    /**
     * Limit how many Realtors to delete.
     */
    limit?: number
  }

  /**
   * Realtor without action
   */
  export type RealtorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Realtor
     */
    select?: RealtorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Realtor
     */
    omit?: RealtorOmit<ExtArgs> | null
  }


  /**
   * Model MlsProperty
   */

  export type AggregateMlsProperty = {
    _count: MlsPropertyCountAggregateOutputType | null
    _avg: MlsPropertyAvgAggregateOutputType | null
    _sum: MlsPropertySumAggregateOutputType | null
    _min: MlsPropertyMinAggregateOutputType | null
    _max: MlsPropertyMaxAggregateOutputType | null
  }

  export type MlsPropertyAvgAggregateOutputType = {
    id: number | null
    listPrice: number | null
    daysListed: number | null
    zillowViews: number | null
  }

  export type MlsPropertySumAggregateOutputType = {
    id: number | null
    listPrice: number | null
    daysListed: number | null
    zillowViews: number | null
  }

  export type MlsPropertyMinAggregateOutputType = {
    id: number | null
    address: string | null
    type: string | null
    listPrice: number | null
    agent: string | null
    agentRaw: string | null
    admin: string | null
    listingExp: string | null
    showingInst: string | null
    mlsStatus: string | null
    mlsNum: string | null
    zillow: string | null
    notes: string | null
    country: string | null
    usState: string | null
    city: string | null
    daysListed: number | null
    zillowViews: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MlsPropertyMaxAggregateOutputType = {
    id: number | null
    address: string | null
    type: string | null
    listPrice: number | null
    agent: string | null
    agentRaw: string | null
    admin: string | null
    listingExp: string | null
    showingInst: string | null
    mlsStatus: string | null
    mlsNum: string | null
    zillow: string | null
    notes: string | null
    country: string | null
    usState: string | null
    city: string | null
    daysListed: number | null
    zillowViews: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MlsPropertyCountAggregateOutputType = {
    id: number
    address: number
    type: number
    listPrice: number
    agent: number
    agentRaw: number
    admin: number
    listingExp: number
    showingInst: number
    mlsStatus: number
    mlsNum: number
    zillow: number
    notes: number
    country: number
    usState: number
    city: number
    daysListed: number
    zillowViews: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MlsPropertyAvgAggregateInputType = {
    id?: true
    listPrice?: true
    daysListed?: true
    zillowViews?: true
  }

  export type MlsPropertySumAggregateInputType = {
    id?: true
    listPrice?: true
    daysListed?: true
    zillowViews?: true
  }

  export type MlsPropertyMinAggregateInputType = {
    id?: true
    address?: true
    type?: true
    listPrice?: true
    agent?: true
    agentRaw?: true
    admin?: true
    listingExp?: true
    showingInst?: true
    mlsStatus?: true
    mlsNum?: true
    zillow?: true
    notes?: true
    country?: true
    usState?: true
    city?: true
    daysListed?: true
    zillowViews?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MlsPropertyMaxAggregateInputType = {
    id?: true
    address?: true
    type?: true
    listPrice?: true
    agent?: true
    agentRaw?: true
    admin?: true
    listingExp?: true
    showingInst?: true
    mlsStatus?: true
    mlsNum?: true
    zillow?: true
    notes?: true
    country?: true
    usState?: true
    city?: true
    daysListed?: true
    zillowViews?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MlsPropertyCountAggregateInputType = {
    id?: true
    address?: true
    type?: true
    listPrice?: true
    agent?: true
    agentRaw?: true
    admin?: true
    listingExp?: true
    showingInst?: true
    mlsStatus?: true
    mlsNum?: true
    zillow?: true
    notes?: true
    country?: true
    usState?: true
    city?: true
    daysListed?: true
    zillowViews?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MlsPropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MlsProperty to aggregate.
     */
    where?: MlsPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MlsProperties to fetch.
     */
    orderBy?: MlsPropertyOrderByWithRelationInput | MlsPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MlsPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MlsProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MlsProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MlsProperties
    **/
    _count?: true | MlsPropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MlsPropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MlsPropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MlsPropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MlsPropertyMaxAggregateInputType
  }

  export type GetMlsPropertyAggregateType<T extends MlsPropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateMlsProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMlsProperty[P]>
      : GetScalarType<T[P], AggregateMlsProperty[P]>
  }




  export type MlsPropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MlsPropertyWhereInput
    orderBy?: MlsPropertyOrderByWithAggregationInput | MlsPropertyOrderByWithAggregationInput[]
    by: MlsPropertyScalarFieldEnum[] | MlsPropertyScalarFieldEnum
    having?: MlsPropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MlsPropertyCountAggregateInputType | true
    _avg?: MlsPropertyAvgAggregateInputType
    _sum?: MlsPropertySumAggregateInputType
    _min?: MlsPropertyMinAggregateInputType
    _max?: MlsPropertyMaxAggregateInputType
  }

  export type MlsPropertyGroupByOutputType = {
    id: number
    address: string
    type: string
    listPrice: number
    agent: string
    agentRaw: string
    admin: string
    listingExp: string
    showingInst: string
    mlsStatus: string
    mlsNum: string
    zillow: string
    notes: string
    country: string
    usState: string
    city: string
    daysListed: number
    zillowViews: number
    createdAt: Date
    updatedAt: Date
    _count: MlsPropertyCountAggregateOutputType | null
    _avg: MlsPropertyAvgAggregateOutputType | null
    _sum: MlsPropertySumAggregateOutputType | null
    _min: MlsPropertyMinAggregateOutputType | null
    _max: MlsPropertyMaxAggregateOutputType | null
  }

  type GetMlsPropertyGroupByPayload<T extends MlsPropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MlsPropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MlsPropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MlsPropertyGroupByOutputType[P]>
            : GetScalarType<T[P], MlsPropertyGroupByOutputType[P]>
        }
      >
    >


  export type MlsPropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    type?: boolean
    listPrice?: boolean
    agent?: boolean
    agentRaw?: boolean
    admin?: boolean
    listingExp?: boolean
    showingInst?: boolean
    mlsStatus?: boolean
    mlsNum?: boolean
    zillow?: boolean
    notes?: boolean
    country?: boolean
    usState?: boolean
    city?: boolean
    daysListed?: boolean
    zillowViews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mlsProperty"]>

  export type MlsPropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    type?: boolean
    listPrice?: boolean
    agent?: boolean
    agentRaw?: boolean
    admin?: boolean
    listingExp?: boolean
    showingInst?: boolean
    mlsStatus?: boolean
    mlsNum?: boolean
    zillow?: boolean
    notes?: boolean
    country?: boolean
    usState?: boolean
    city?: boolean
    daysListed?: boolean
    zillowViews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mlsProperty"]>

  export type MlsPropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    type?: boolean
    listPrice?: boolean
    agent?: boolean
    agentRaw?: boolean
    admin?: boolean
    listingExp?: boolean
    showingInst?: boolean
    mlsStatus?: boolean
    mlsNum?: boolean
    zillow?: boolean
    notes?: boolean
    country?: boolean
    usState?: boolean
    city?: boolean
    daysListed?: boolean
    zillowViews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mlsProperty"]>

  export type MlsPropertySelectScalar = {
    id?: boolean
    address?: boolean
    type?: boolean
    listPrice?: boolean
    agent?: boolean
    agentRaw?: boolean
    admin?: boolean
    listingExp?: boolean
    showingInst?: boolean
    mlsStatus?: boolean
    mlsNum?: boolean
    zillow?: boolean
    notes?: boolean
    country?: boolean
    usState?: boolean
    city?: boolean
    daysListed?: boolean
    zillowViews?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MlsPropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "type" | "listPrice" | "agent" | "agentRaw" | "admin" | "listingExp" | "showingInst" | "mlsStatus" | "mlsNum" | "zillow" | "notes" | "country" | "usState" | "city" | "daysListed" | "zillowViews" | "createdAt" | "updatedAt", ExtArgs["result"]["mlsProperty"]>

  export type $MlsPropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MlsProperty"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      address: string
      type: string
      listPrice: number
      agent: string
      agentRaw: string
      admin: string
      listingExp: string
      showingInst: string
      mlsStatus: string
      mlsNum: string
      zillow: string
      notes: string
      country: string
      usState: string
      city: string
      daysListed: number
      zillowViews: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mlsProperty"]>
    composites: {}
  }

  type MlsPropertyGetPayload<S extends boolean | null | undefined | MlsPropertyDefaultArgs> = $Result.GetResult<Prisma.$MlsPropertyPayload, S>

  type MlsPropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MlsPropertyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MlsPropertyCountAggregateInputType | true
    }

  export interface MlsPropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MlsProperty'], meta: { name: 'MlsProperty' } }
    /**
     * Find zero or one MlsProperty that matches the filter.
     * @param {MlsPropertyFindUniqueArgs} args - Arguments to find a MlsProperty
     * @example
     * // Get one MlsProperty
     * const mlsProperty = await prisma.mlsProperty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MlsPropertyFindUniqueArgs>(args: SelectSubset<T, MlsPropertyFindUniqueArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MlsProperty that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MlsPropertyFindUniqueOrThrowArgs} args - Arguments to find a MlsProperty
     * @example
     * // Get one MlsProperty
     * const mlsProperty = await prisma.mlsProperty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MlsPropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, MlsPropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MlsProperty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyFindFirstArgs} args - Arguments to find a MlsProperty
     * @example
     * // Get one MlsProperty
     * const mlsProperty = await prisma.mlsProperty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MlsPropertyFindFirstArgs>(args?: SelectSubset<T, MlsPropertyFindFirstArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MlsProperty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyFindFirstOrThrowArgs} args - Arguments to find a MlsProperty
     * @example
     * // Get one MlsProperty
     * const mlsProperty = await prisma.mlsProperty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MlsPropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, MlsPropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MlsProperties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MlsProperties
     * const mlsProperties = await prisma.mlsProperty.findMany()
     * 
     * // Get first 10 MlsProperties
     * const mlsProperties = await prisma.mlsProperty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mlsPropertyWithIdOnly = await prisma.mlsProperty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MlsPropertyFindManyArgs>(args?: SelectSubset<T, MlsPropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MlsProperty.
     * @param {MlsPropertyCreateArgs} args - Arguments to create a MlsProperty.
     * @example
     * // Create one MlsProperty
     * const MlsProperty = await prisma.mlsProperty.create({
     *   data: {
     *     // ... data to create a MlsProperty
     *   }
     * })
     * 
     */
    create<T extends MlsPropertyCreateArgs>(args: SelectSubset<T, MlsPropertyCreateArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MlsProperties.
     * @param {MlsPropertyCreateManyArgs} args - Arguments to create many MlsProperties.
     * @example
     * // Create many MlsProperties
     * const mlsProperty = await prisma.mlsProperty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MlsPropertyCreateManyArgs>(args?: SelectSubset<T, MlsPropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MlsProperties and returns the data saved in the database.
     * @param {MlsPropertyCreateManyAndReturnArgs} args - Arguments to create many MlsProperties.
     * @example
     * // Create many MlsProperties
     * const mlsProperty = await prisma.mlsProperty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MlsProperties and only return the `id`
     * const mlsPropertyWithIdOnly = await prisma.mlsProperty.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MlsPropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, MlsPropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MlsProperty.
     * @param {MlsPropertyDeleteArgs} args - Arguments to delete one MlsProperty.
     * @example
     * // Delete one MlsProperty
     * const MlsProperty = await prisma.mlsProperty.delete({
     *   where: {
     *     // ... filter to delete one MlsProperty
     *   }
     * })
     * 
     */
    delete<T extends MlsPropertyDeleteArgs>(args: SelectSubset<T, MlsPropertyDeleteArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MlsProperty.
     * @param {MlsPropertyUpdateArgs} args - Arguments to update one MlsProperty.
     * @example
     * // Update one MlsProperty
     * const mlsProperty = await prisma.mlsProperty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MlsPropertyUpdateArgs>(args: SelectSubset<T, MlsPropertyUpdateArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MlsProperties.
     * @param {MlsPropertyDeleteManyArgs} args - Arguments to filter MlsProperties to delete.
     * @example
     * // Delete a few MlsProperties
     * const { count } = await prisma.mlsProperty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MlsPropertyDeleteManyArgs>(args?: SelectSubset<T, MlsPropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MlsProperties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MlsProperties
     * const mlsProperty = await prisma.mlsProperty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MlsPropertyUpdateManyArgs>(args: SelectSubset<T, MlsPropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MlsProperties and returns the data updated in the database.
     * @param {MlsPropertyUpdateManyAndReturnArgs} args - Arguments to update many MlsProperties.
     * @example
     * // Update many MlsProperties
     * const mlsProperty = await prisma.mlsProperty.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MlsProperties and only return the `id`
     * const mlsPropertyWithIdOnly = await prisma.mlsProperty.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MlsPropertyUpdateManyAndReturnArgs>(args: SelectSubset<T, MlsPropertyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MlsProperty.
     * @param {MlsPropertyUpsertArgs} args - Arguments to update or create a MlsProperty.
     * @example
     * // Update or create a MlsProperty
     * const mlsProperty = await prisma.mlsProperty.upsert({
     *   create: {
     *     // ... data to create a MlsProperty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MlsProperty we want to update
     *   }
     * })
     */
    upsert<T extends MlsPropertyUpsertArgs>(args: SelectSubset<T, MlsPropertyUpsertArgs<ExtArgs>>): Prisma__MlsPropertyClient<$Result.GetResult<Prisma.$MlsPropertyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MlsProperties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyCountArgs} args - Arguments to filter MlsProperties to count.
     * @example
     * // Count the number of MlsProperties
     * const count = await prisma.mlsProperty.count({
     *   where: {
     *     // ... the filter for the MlsProperties we want to count
     *   }
     * })
    **/
    count<T extends MlsPropertyCountArgs>(
      args?: Subset<T, MlsPropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MlsPropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MlsProperty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MlsPropertyAggregateArgs>(args: Subset<T, MlsPropertyAggregateArgs>): Prisma.PrismaPromise<GetMlsPropertyAggregateType<T>>

    /**
     * Group by MlsProperty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MlsPropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MlsPropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MlsPropertyGroupByArgs['orderBy'] }
        : { orderBy?: MlsPropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MlsPropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMlsPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MlsProperty model
   */
  readonly fields: MlsPropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MlsProperty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MlsPropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MlsProperty model
   */
  interface MlsPropertyFieldRefs {
    readonly id: FieldRef<"MlsProperty", 'Int'>
    readonly address: FieldRef<"MlsProperty", 'String'>
    readonly type: FieldRef<"MlsProperty", 'String'>
    readonly listPrice: FieldRef<"MlsProperty", 'Float'>
    readonly agent: FieldRef<"MlsProperty", 'String'>
    readonly agentRaw: FieldRef<"MlsProperty", 'String'>
    readonly admin: FieldRef<"MlsProperty", 'String'>
    readonly listingExp: FieldRef<"MlsProperty", 'String'>
    readonly showingInst: FieldRef<"MlsProperty", 'String'>
    readonly mlsStatus: FieldRef<"MlsProperty", 'String'>
    readonly mlsNum: FieldRef<"MlsProperty", 'String'>
    readonly zillow: FieldRef<"MlsProperty", 'String'>
    readonly notes: FieldRef<"MlsProperty", 'String'>
    readonly country: FieldRef<"MlsProperty", 'String'>
    readonly usState: FieldRef<"MlsProperty", 'String'>
    readonly city: FieldRef<"MlsProperty", 'String'>
    readonly daysListed: FieldRef<"MlsProperty", 'Int'>
    readonly zillowViews: FieldRef<"MlsProperty", 'Int'>
    readonly createdAt: FieldRef<"MlsProperty", 'DateTime'>
    readonly updatedAt: FieldRef<"MlsProperty", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MlsProperty findUnique
   */
  export type MlsPropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * Filter, which MlsProperty to fetch.
     */
    where: MlsPropertyWhereUniqueInput
  }

  /**
   * MlsProperty findUniqueOrThrow
   */
  export type MlsPropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * Filter, which MlsProperty to fetch.
     */
    where: MlsPropertyWhereUniqueInput
  }

  /**
   * MlsProperty findFirst
   */
  export type MlsPropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * Filter, which MlsProperty to fetch.
     */
    where?: MlsPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MlsProperties to fetch.
     */
    orderBy?: MlsPropertyOrderByWithRelationInput | MlsPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MlsProperties.
     */
    cursor?: MlsPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MlsProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MlsProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MlsProperties.
     */
    distinct?: MlsPropertyScalarFieldEnum | MlsPropertyScalarFieldEnum[]
  }

  /**
   * MlsProperty findFirstOrThrow
   */
  export type MlsPropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * Filter, which MlsProperty to fetch.
     */
    where?: MlsPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MlsProperties to fetch.
     */
    orderBy?: MlsPropertyOrderByWithRelationInput | MlsPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MlsProperties.
     */
    cursor?: MlsPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MlsProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MlsProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MlsProperties.
     */
    distinct?: MlsPropertyScalarFieldEnum | MlsPropertyScalarFieldEnum[]
  }

  /**
   * MlsProperty findMany
   */
  export type MlsPropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * Filter, which MlsProperties to fetch.
     */
    where?: MlsPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MlsProperties to fetch.
     */
    orderBy?: MlsPropertyOrderByWithRelationInput | MlsPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MlsProperties.
     */
    cursor?: MlsPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MlsProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MlsProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MlsProperties.
     */
    distinct?: MlsPropertyScalarFieldEnum | MlsPropertyScalarFieldEnum[]
  }

  /**
   * MlsProperty create
   */
  export type MlsPropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * The data needed to create a MlsProperty.
     */
    data: XOR<MlsPropertyCreateInput, MlsPropertyUncheckedCreateInput>
  }

  /**
   * MlsProperty createMany
   */
  export type MlsPropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MlsProperties.
     */
    data: MlsPropertyCreateManyInput | MlsPropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MlsProperty createManyAndReturn
   */
  export type MlsPropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * The data used to create many MlsProperties.
     */
    data: MlsPropertyCreateManyInput | MlsPropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MlsProperty update
   */
  export type MlsPropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * The data needed to update a MlsProperty.
     */
    data: XOR<MlsPropertyUpdateInput, MlsPropertyUncheckedUpdateInput>
    /**
     * Choose, which MlsProperty to update.
     */
    where: MlsPropertyWhereUniqueInput
  }

  /**
   * MlsProperty updateMany
   */
  export type MlsPropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MlsProperties.
     */
    data: XOR<MlsPropertyUpdateManyMutationInput, MlsPropertyUncheckedUpdateManyInput>
    /**
     * Filter which MlsProperties to update
     */
    where?: MlsPropertyWhereInput
    /**
     * Limit how many MlsProperties to update.
     */
    limit?: number
  }

  /**
   * MlsProperty updateManyAndReturn
   */
  export type MlsPropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * The data used to update MlsProperties.
     */
    data: XOR<MlsPropertyUpdateManyMutationInput, MlsPropertyUncheckedUpdateManyInput>
    /**
     * Filter which MlsProperties to update
     */
    where?: MlsPropertyWhereInput
    /**
     * Limit how many MlsProperties to update.
     */
    limit?: number
  }

  /**
   * MlsProperty upsert
   */
  export type MlsPropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * The filter to search for the MlsProperty to update in case it exists.
     */
    where: MlsPropertyWhereUniqueInput
    /**
     * In case the MlsProperty found by the `where` argument doesn't exist, create a new MlsProperty with this data.
     */
    create: XOR<MlsPropertyCreateInput, MlsPropertyUncheckedCreateInput>
    /**
     * In case the MlsProperty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MlsPropertyUpdateInput, MlsPropertyUncheckedUpdateInput>
  }

  /**
   * MlsProperty delete
   */
  export type MlsPropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
    /**
     * Filter which MlsProperty to delete.
     */
    where: MlsPropertyWhereUniqueInput
  }

  /**
   * MlsProperty deleteMany
   */
  export type MlsPropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MlsProperties to delete
     */
    where?: MlsPropertyWhereInput
    /**
     * Limit how many MlsProperties to delete.
     */
    limit?: number
  }

  /**
   * MlsProperty without action
   */
  export type MlsPropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MlsProperty
     */
    select?: MlsPropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MlsProperty
     */
    omit?: MlsPropertyOmit<ExtArgs> | null
  }


  /**
   * Model Operation
   */

  export type AggregateOperation = {
    _count: OperationCountAggregateOutputType | null
    _avg: OperationAvgAggregateOutputType | null
    _sum: OperationSumAggregateOutputType | null
    _min: OperationMinAggregateOutputType | null
    _max: OperationMaxAggregateOutputType | null
  }

  export type OperationAvgAggregateOutputType = {
    id: number | null
    price: number | null
    clientId: number | null
    compPct: number | null
    compFixed: number | null
  }

  export type OperationSumAggregateOutputType = {
    id: number | null
    price: number | null
    clientId: number | null
    compPct: number | null
    compFixed: number | null
  }

  export type OperationMinAggregateOutputType = {
    id: number | null
    address: string | null
    type: string | null
    price: number | null
    financing: string | null
    agent: string | null
    realtor: string | null
    titleCo: string | null
    clientId: number | null
    buyerName: string | null
    execDate: string | null
    closingDate: string | null
    closingDateISO: string | null
    status: string | null
    commissionPaid: boolean | null
    compSigned: string | null
    compPct: number | null
    compFixed: number | null
    escrow: string | null
    lbp: string | null
    sd: string | null
    flood: string | null
    condoDocs: string | null
    condoRider: string | null
    inspDone: string | null
    inspStatus: string | null
    inspNotes: string | null
    appraisal: string | null
    reinsp: string | null
    pending: string | null
    closingNear: boolean | null
    isRented: boolean | null
    leaseAgreementSent: boolean | null
    estoppelSent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OperationMaxAggregateOutputType = {
    id: number | null
    address: string | null
    type: string | null
    price: number | null
    financing: string | null
    agent: string | null
    realtor: string | null
    titleCo: string | null
    clientId: number | null
    buyerName: string | null
    execDate: string | null
    closingDate: string | null
    closingDateISO: string | null
    status: string | null
    commissionPaid: boolean | null
    compSigned: string | null
    compPct: number | null
    compFixed: number | null
    escrow: string | null
    lbp: string | null
    sd: string | null
    flood: string | null
    condoDocs: string | null
    condoRider: string | null
    inspDone: string | null
    inspStatus: string | null
    inspNotes: string | null
    appraisal: string | null
    reinsp: string | null
    pending: string | null
    closingNear: boolean | null
    isRented: boolean | null
    leaseAgreementSent: boolean | null
    estoppelSent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OperationCountAggregateOutputType = {
    id: number
    address: number
    type: number
    price: number
    financing: number
    agent: number
    realtor: number
    titleCo: number
    clientId: number
    buyerName: number
    execDate: number
    closingDate: number
    closingDateISO: number
    status: number
    commissionPaid: number
    compSigned: number
    compPct: number
    compFixed: number
    escrow: number
    lbp: number
    sd: number
    flood: number
    condoDocs: number
    condoRider: number
    inspDone: number
    inspStatus: number
    inspNotes: number
    appraisal: number
    reinsp: number
    pending: number
    closingNear: number
    isRented: number
    leaseAgreementSent: number
    estoppelSent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OperationAvgAggregateInputType = {
    id?: true
    price?: true
    clientId?: true
    compPct?: true
    compFixed?: true
  }

  export type OperationSumAggregateInputType = {
    id?: true
    price?: true
    clientId?: true
    compPct?: true
    compFixed?: true
  }

  export type OperationMinAggregateInputType = {
    id?: true
    address?: true
    type?: true
    price?: true
    financing?: true
    agent?: true
    realtor?: true
    titleCo?: true
    clientId?: true
    buyerName?: true
    execDate?: true
    closingDate?: true
    closingDateISO?: true
    status?: true
    commissionPaid?: true
    compSigned?: true
    compPct?: true
    compFixed?: true
    escrow?: true
    lbp?: true
    sd?: true
    flood?: true
    condoDocs?: true
    condoRider?: true
    inspDone?: true
    inspStatus?: true
    inspNotes?: true
    appraisal?: true
    reinsp?: true
    pending?: true
    closingNear?: true
    isRented?: true
    leaseAgreementSent?: true
    estoppelSent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OperationMaxAggregateInputType = {
    id?: true
    address?: true
    type?: true
    price?: true
    financing?: true
    agent?: true
    realtor?: true
    titleCo?: true
    clientId?: true
    buyerName?: true
    execDate?: true
    closingDate?: true
    closingDateISO?: true
    status?: true
    commissionPaid?: true
    compSigned?: true
    compPct?: true
    compFixed?: true
    escrow?: true
    lbp?: true
    sd?: true
    flood?: true
    condoDocs?: true
    condoRider?: true
    inspDone?: true
    inspStatus?: true
    inspNotes?: true
    appraisal?: true
    reinsp?: true
    pending?: true
    closingNear?: true
    isRented?: true
    leaseAgreementSent?: true
    estoppelSent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OperationCountAggregateInputType = {
    id?: true
    address?: true
    type?: true
    price?: true
    financing?: true
    agent?: true
    realtor?: true
    titleCo?: true
    clientId?: true
    buyerName?: true
    execDate?: true
    closingDate?: true
    closingDateISO?: true
    status?: true
    commissionPaid?: true
    compSigned?: true
    compPct?: true
    compFixed?: true
    escrow?: true
    lbp?: true
    sd?: true
    flood?: true
    condoDocs?: true
    condoRider?: true
    inspDone?: true
    inspStatus?: true
    inspNotes?: true
    appraisal?: true
    reinsp?: true
    pending?: true
    closingNear?: true
    isRented?: true
    leaseAgreementSent?: true
    estoppelSent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OperationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operation to aggregate.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Operations
    **/
    _count?: true | OperationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OperationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OperationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperationMaxAggregateInputType
  }

  export type GetOperationAggregateType<T extends OperationAggregateArgs> = {
        [P in keyof T & keyof AggregateOperation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperation[P]>
      : GetScalarType<T[P], AggregateOperation[P]>
  }




  export type OperationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationWhereInput
    orderBy?: OperationOrderByWithAggregationInput | OperationOrderByWithAggregationInput[]
    by: OperationScalarFieldEnum[] | OperationScalarFieldEnum
    having?: OperationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperationCountAggregateInputType | true
    _avg?: OperationAvgAggregateInputType
    _sum?: OperationSumAggregateInputType
    _min?: OperationMinAggregateInputType
    _max?: OperationMaxAggregateInputType
  }

  export type OperationGroupByOutputType = {
    id: number
    address: string
    type: string
    price: number
    financing: string
    agent: string
    realtor: string
    titleCo: string
    clientId: number
    buyerName: string
    execDate: string
    closingDate: string
    closingDateISO: string
    status: string
    commissionPaid: boolean
    compSigned: string
    compPct: number
    compFixed: number
    escrow: string
    lbp: string
    sd: string
    flood: string
    condoDocs: string
    condoRider: string
    inspDone: string
    inspStatus: string
    inspNotes: string
    appraisal: string
    reinsp: string
    pending: string
    closingNear: boolean
    isRented: boolean
    leaseAgreementSent: boolean
    estoppelSent: boolean
    createdAt: Date
    updatedAt: Date
    _count: OperationCountAggregateOutputType | null
    _avg: OperationAvgAggregateOutputType | null
    _sum: OperationSumAggregateOutputType | null
    _min: OperationMinAggregateOutputType | null
    _max: OperationMaxAggregateOutputType | null
  }

  type GetOperationGroupByPayload<T extends OperationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperationGroupByOutputType[P]>
            : GetScalarType<T[P], OperationGroupByOutputType[P]>
        }
      >
    >


  export type OperationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    type?: boolean
    price?: boolean
    financing?: boolean
    agent?: boolean
    realtor?: boolean
    titleCo?: boolean
    clientId?: boolean
    buyerName?: boolean
    execDate?: boolean
    closingDate?: boolean
    closingDateISO?: boolean
    status?: boolean
    commissionPaid?: boolean
    compSigned?: boolean
    compPct?: boolean
    compFixed?: boolean
    escrow?: boolean
    lbp?: boolean
    sd?: boolean
    flood?: boolean
    condoDocs?: boolean
    condoRider?: boolean
    inspDone?: boolean
    inspStatus?: boolean
    inspNotes?: boolean
    appraisal?: boolean
    reinsp?: boolean
    pending?: boolean
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["operation"]>

  export type OperationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    type?: boolean
    price?: boolean
    financing?: boolean
    agent?: boolean
    realtor?: boolean
    titleCo?: boolean
    clientId?: boolean
    buyerName?: boolean
    execDate?: boolean
    closingDate?: boolean
    closingDateISO?: boolean
    status?: boolean
    commissionPaid?: boolean
    compSigned?: boolean
    compPct?: boolean
    compFixed?: boolean
    escrow?: boolean
    lbp?: boolean
    sd?: boolean
    flood?: boolean
    condoDocs?: boolean
    condoRider?: boolean
    inspDone?: boolean
    inspStatus?: boolean
    inspNotes?: boolean
    appraisal?: boolean
    reinsp?: boolean
    pending?: boolean
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["operation"]>

  export type OperationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    type?: boolean
    price?: boolean
    financing?: boolean
    agent?: boolean
    realtor?: boolean
    titleCo?: boolean
    clientId?: boolean
    buyerName?: boolean
    execDate?: boolean
    closingDate?: boolean
    closingDateISO?: boolean
    status?: boolean
    commissionPaid?: boolean
    compSigned?: boolean
    compPct?: boolean
    compFixed?: boolean
    escrow?: boolean
    lbp?: boolean
    sd?: boolean
    flood?: boolean
    condoDocs?: boolean
    condoRider?: boolean
    inspDone?: boolean
    inspStatus?: boolean
    inspNotes?: boolean
    appraisal?: boolean
    reinsp?: boolean
    pending?: boolean
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["operation"]>

  export type OperationSelectScalar = {
    id?: boolean
    address?: boolean
    type?: boolean
    price?: boolean
    financing?: boolean
    agent?: boolean
    realtor?: boolean
    titleCo?: boolean
    clientId?: boolean
    buyerName?: boolean
    execDate?: boolean
    closingDate?: boolean
    closingDateISO?: boolean
    status?: boolean
    commissionPaid?: boolean
    compSigned?: boolean
    compPct?: boolean
    compFixed?: boolean
    escrow?: boolean
    lbp?: boolean
    sd?: boolean
    flood?: boolean
    condoDocs?: boolean
    condoRider?: boolean
    inspDone?: boolean
    inspStatus?: boolean
    inspNotes?: boolean
    appraisal?: boolean
    reinsp?: boolean
    pending?: boolean
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OperationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "type" | "price" | "financing" | "agent" | "realtor" | "titleCo" | "clientId" | "buyerName" | "execDate" | "closingDate" | "closingDateISO" | "status" | "commissionPaid" | "compSigned" | "compPct" | "compFixed" | "escrow" | "lbp" | "sd" | "flood" | "condoDocs" | "condoRider" | "inspDone" | "inspStatus" | "inspNotes" | "appraisal" | "reinsp" | "pending" | "closingNear" | "isRented" | "leaseAgreementSent" | "estoppelSent" | "createdAt" | "updatedAt", ExtArgs["result"]["operation"]>

  export type $OperationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Operation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      address: string
      type: string
      price: number
      financing: string
      agent: string
      realtor: string
      titleCo: string
      clientId: number
      buyerName: string
      execDate: string
      closingDate: string
      closingDateISO: string
      status: string
      commissionPaid: boolean
      compSigned: string
      compPct: number
      compFixed: number
      escrow: string
      lbp: string
      sd: string
      flood: string
      condoDocs: string
      condoRider: string
      inspDone: string
      inspStatus: string
      inspNotes: string
      appraisal: string
      reinsp: string
      pending: string
      closingNear: boolean
      isRented: boolean
      leaseAgreementSent: boolean
      estoppelSent: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["operation"]>
    composites: {}
  }

  type OperationGetPayload<S extends boolean | null | undefined | OperationDefaultArgs> = $Result.GetResult<Prisma.$OperationPayload, S>

  type OperationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperationCountAggregateInputType | true
    }

  export interface OperationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Operation'], meta: { name: 'Operation' } }
    /**
     * Find zero or one Operation that matches the filter.
     * @param {OperationFindUniqueArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationFindUniqueArgs>(args: SelectSubset<T, OperationFindUniqueArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Operation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationFindUniqueOrThrowArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationFindUniqueOrThrowArgs>(args: SelectSubset<T, OperationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationFindFirstArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationFindFirstArgs>(args?: SelectSubset<T, OperationFindFirstArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationFindFirstOrThrowArgs} args - Arguments to find a Operation
     * @example
     * // Get one Operation
     * const operation = await prisma.operation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationFindFirstOrThrowArgs>(args?: SelectSubset<T, OperationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Operations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Operations
     * const operations = await prisma.operation.findMany()
     * 
     * // Get first 10 Operations
     * const operations = await prisma.operation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operationWithIdOnly = await prisma.operation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OperationFindManyArgs>(args?: SelectSubset<T, OperationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Operation.
     * @param {OperationCreateArgs} args - Arguments to create a Operation.
     * @example
     * // Create one Operation
     * const Operation = await prisma.operation.create({
     *   data: {
     *     // ... data to create a Operation
     *   }
     * })
     * 
     */
    create<T extends OperationCreateArgs>(args: SelectSubset<T, OperationCreateArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Operations.
     * @param {OperationCreateManyArgs} args - Arguments to create many Operations.
     * @example
     * // Create many Operations
     * const operation = await prisma.operation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperationCreateManyArgs>(args?: SelectSubset<T, OperationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Operations and returns the data saved in the database.
     * @param {OperationCreateManyAndReturnArgs} args - Arguments to create many Operations.
     * @example
     * // Create many Operations
     * const operation = await prisma.operation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Operations and only return the `id`
     * const operationWithIdOnly = await prisma.operation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperationCreateManyAndReturnArgs>(args?: SelectSubset<T, OperationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Operation.
     * @param {OperationDeleteArgs} args - Arguments to delete one Operation.
     * @example
     * // Delete one Operation
     * const Operation = await prisma.operation.delete({
     *   where: {
     *     // ... filter to delete one Operation
     *   }
     * })
     * 
     */
    delete<T extends OperationDeleteArgs>(args: SelectSubset<T, OperationDeleteArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Operation.
     * @param {OperationUpdateArgs} args - Arguments to update one Operation.
     * @example
     * // Update one Operation
     * const operation = await prisma.operation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperationUpdateArgs>(args: SelectSubset<T, OperationUpdateArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Operations.
     * @param {OperationDeleteManyArgs} args - Arguments to filter Operations to delete.
     * @example
     * // Delete a few Operations
     * const { count } = await prisma.operation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperationDeleteManyArgs>(args?: SelectSubset<T, OperationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Operations
     * const operation = await prisma.operation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperationUpdateManyArgs>(args: SelectSubset<T, OperationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operations and returns the data updated in the database.
     * @param {OperationUpdateManyAndReturnArgs} args - Arguments to update many Operations.
     * @example
     * // Update many Operations
     * const operation = await prisma.operation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Operations and only return the `id`
     * const operationWithIdOnly = await prisma.operation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OperationUpdateManyAndReturnArgs>(args: SelectSubset<T, OperationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Operation.
     * @param {OperationUpsertArgs} args - Arguments to update or create a Operation.
     * @example
     * // Update or create a Operation
     * const operation = await prisma.operation.upsert({
     *   create: {
     *     // ... data to create a Operation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Operation we want to update
     *   }
     * })
     */
    upsert<T extends OperationUpsertArgs>(args: SelectSubset<T, OperationUpsertArgs<ExtArgs>>): Prisma__OperationClient<$Result.GetResult<Prisma.$OperationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Operations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationCountArgs} args - Arguments to filter Operations to count.
     * @example
     * // Count the number of Operations
     * const count = await prisma.operation.count({
     *   where: {
     *     // ... the filter for the Operations we want to count
     *   }
     * })
    **/
    count<T extends OperationCountArgs>(
      args?: Subset<T, OperationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Operation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OperationAggregateArgs>(args: Subset<T, OperationAggregateArgs>): Prisma.PrismaPromise<GetOperationAggregateType<T>>

    /**
     * Group by Operation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OperationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperationGroupByArgs['orderBy'] }
        : { orderBy?: OperationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OperationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Operation model
   */
  readonly fields: OperationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Operation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Operation model
   */
  interface OperationFieldRefs {
    readonly id: FieldRef<"Operation", 'Int'>
    readonly address: FieldRef<"Operation", 'String'>
    readonly type: FieldRef<"Operation", 'String'>
    readonly price: FieldRef<"Operation", 'Float'>
    readonly financing: FieldRef<"Operation", 'String'>
    readonly agent: FieldRef<"Operation", 'String'>
    readonly realtor: FieldRef<"Operation", 'String'>
    readonly titleCo: FieldRef<"Operation", 'String'>
    readonly clientId: FieldRef<"Operation", 'Int'>
    readonly buyerName: FieldRef<"Operation", 'String'>
    readonly execDate: FieldRef<"Operation", 'String'>
    readonly closingDate: FieldRef<"Operation", 'String'>
    readonly closingDateISO: FieldRef<"Operation", 'String'>
    readonly status: FieldRef<"Operation", 'String'>
    readonly commissionPaid: FieldRef<"Operation", 'Boolean'>
    readonly compSigned: FieldRef<"Operation", 'String'>
    readonly compPct: FieldRef<"Operation", 'Float'>
    readonly compFixed: FieldRef<"Operation", 'Float'>
    readonly escrow: FieldRef<"Operation", 'String'>
    readonly lbp: FieldRef<"Operation", 'String'>
    readonly sd: FieldRef<"Operation", 'String'>
    readonly flood: FieldRef<"Operation", 'String'>
    readonly condoDocs: FieldRef<"Operation", 'String'>
    readonly condoRider: FieldRef<"Operation", 'String'>
    readonly inspDone: FieldRef<"Operation", 'String'>
    readonly inspStatus: FieldRef<"Operation", 'String'>
    readonly inspNotes: FieldRef<"Operation", 'String'>
    readonly appraisal: FieldRef<"Operation", 'String'>
    readonly reinsp: FieldRef<"Operation", 'String'>
    readonly pending: FieldRef<"Operation", 'String'>
    readonly closingNear: FieldRef<"Operation", 'Boolean'>
    readonly isRented: FieldRef<"Operation", 'Boolean'>
    readonly leaseAgreementSent: FieldRef<"Operation", 'Boolean'>
    readonly estoppelSent: FieldRef<"Operation", 'Boolean'>
    readonly createdAt: FieldRef<"Operation", 'DateTime'>
    readonly updatedAt: FieldRef<"Operation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Operation findUnique
   */
  export type OperationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation findUniqueOrThrow
   */
  export type OperationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation findFirst
   */
  export type OperationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operations.
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Operation findFirstOrThrow
   */
  export type OperationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Filter, which Operation to fetch.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operations.
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Operation findMany
   */
  export type OperationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Filter, which Operations to fetch.
     */
    where?: OperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operations to fetch.
     */
    orderBy?: OperationOrderByWithRelationInput | OperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Operations.
     */
    cursor?: OperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operations.
     */
    distinct?: OperationScalarFieldEnum | OperationScalarFieldEnum[]
  }

  /**
   * Operation create
   */
  export type OperationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The data needed to create a Operation.
     */
    data: XOR<OperationCreateInput, OperationUncheckedCreateInput>
  }

  /**
   * Operation createMany
   */
  export type OperationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Operations.
     */
    data: OperationCreateManyInput | OperationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Operation createManyAndReturn
   */
  export type OperationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The data used to create many Operations.
     */
    data: OperationCreateManyInput | OperationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Operation update
   */
  export type OperationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The data needed to update a Operation.
     */
    data: XOR<OperationUpdateInput, OperationUncheckedUpdateInput>
    /**
     * Choose, which Operation to update.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation updateMany
   */
  export type OperationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Operations.
     */
    data: XOR<OperationUpdateManyMutationInput, OperationUncheckedUpdateManyInput>
    /**
     * Filter which Operations to update
     */
    where?: OperationWhereInput
    /**
     * Limit how many Operations to update.
     */
    limit?: number
  }

  /**
   * Operation updateManyAndReturn
   */
  export type OperationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The data used to update Operations.
     */
    data: XOR<OperationUpdateManyMutationInput, OperationUncheckedUpdateManyInput>
    /**
     * Filter which Operations to update
     */
    where?: OperationWhereInput
    /**
     * Limit how many Operations to update.
     */
    limit?: number
  }

  /**
   * Operation upsert
   */
  export type OperationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * The filter to search for the Operation to update in case it exists.
     */
    where: OperationWhereUniqueInput
    /**
     * In case the Operation found by the `where` argument doesn't exist, create a new Operation with this data.
     */
    create: XOR<OperationCreateInput, OperationUncheckedCreateInput>
    /**
     * In case the Operation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperationUpdateInput, OperationUncheckedUpdateInput>
  }

  /**
   * Operation delete
   */
  export type OperationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
    /**
     * Filter which Operation to delete.
     */
    where: OperationWhereUniqueInput
  }

  /**
   * Operation deleteMany
   */
  export type OperationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operations to delete
     */
    where?: OperationWhereInput
    /**
     * Limit how many Operations to delete.
     */
    limit?: number
  }

  /**
   * Operation without action
   */
  export type OperationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operation
     */
    select?: OperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operation
     */
    omit?: OperationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    name: 'name',
    initials: 'initials',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    active: 'active',
    closed: 'closed'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const RealtorScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type RealtorScalarFieldEnum = (typeof RealtorScalarFieldEnum)[keyof typeof RealtorScalarFieldEnum]


  export const MlsPropertyScalarFieldEnum: {
    id: 'id',
    address: 'address',
    type: 'type',
    listPrice: 'listPrice',
    agent: 'agent',
    agentRaw: 'agentRaw',
    admin: 'admin',
    listingExp: 'listingExp',
    showingInst: 'showingInst',
    mlsStatus: 'mlsStatus',
    mlsNum: 'mlsNum',
    zillow: 'zillow',
    notes: 'notes',
    country: 'country',
    usState: 'usState',
    city: 'city',
    daysListed: 'daysListed',
    zillowViews: 'zillowViews',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MlsPropertyScalarFieldEnum = (typeof MlsPropertyScalarFieldEnum)[keyof typeof MlsPropertyScalarFieldEnum]


  export const OperationScalarFieldEnum: {
    id: 'id',
    address: 'address',
    type: 'type',
    price: 'price',
    financing: 'financing',
    agent: 'agent',
    realtor: 'realtor',
    titleCo: 'titleCo',
    clientId: 'clientId',
    buyerName: 'buyerName',
    execDate: 'execDate',
    closingDate: 'closingDate',
    closingDateISO: 'closingDateISO',
    status: 'status',
    commissionPaid: 'commissionPaid',
    compSigned: 'compSigned',
    compPct: 'compPct',
    compFixed: 'compFixed',
    escrow: 'escrow',
    lbp: 'lbp',
    sd: 'sd',
    flood: 'flood',
    condoDocs: 'condoDocs',
    condoRider: 'condoRider',
    inspDone: 'inspDone',
    inspStatus: 'inspStatus',
    inspNotes: 'inspNotes',
    appraisal: 'appraisal',
    reinsp: 'reinsp',
    pending: 'pending',
    closingNear: 'closingNear',
    isRented: 'isRented',
    leaseAgreementSent: 'leaseAgreementSent',
    estoppelSent: 'estoppelSent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OperationScalarFieldEnum = (typeof OperationScalarFieldEnum)[keyof typeof OperationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    initials?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    initials?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    initials?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    initials?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    initials?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    active?: IntFilter<"Agent"> | number
    closed?: IntFilter<"Agent"> | number
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    closed?: SortOrder
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    name?: StringFilter<"Agent"> | string
    active?: IntFilter<"Agent"> | number
    closed?: IntFilter<"Agent"> | number
  }, "id">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    closed?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _avg?: AgentAvgOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
    _sum?: AgentSumOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    active?: IntWithAggregatesFilter<"Agent"> | number
    closed?: IntWithAggregatesFilter<"Agent"> | number
  }

  export type RealtorWhereInput = {
    AND?: RealtorWhereInput | RealtorWhereInput[]
    OR?: RealtorWhereInput[]
    NOT?: RealtorWhereInput | RealtorWhereInput[]
    id?: StringFilter<"Realtor"> | string
    name?: StringFilter<"Realtor"> | string
  }

  export type RealtorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RealtorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RealtorWhereInput | RealtorWhereInput[]
    OR?: RealtorWhereInput[]
    NOT?: RealtorWhereInput | RealtorWhereInput[]
    name?: StringFilter<"Realtor"> | string
  }, "id">

  export type RealtorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: RealtorCountOrderByAggregateInput
    _max?: RealtorMaxOrderByAggregateInput
    _min?: RealtorMinOrderByAggregateInput
  }

  export type RealtorScalarWhereWithAggregatesInput = {
    AND?: RealtorScalarWhereWithAggregatesInput | RealtorScalarWhereWithAggregatesInput[]
    OR?: RealtorScalarWhereWithAggregatesInput[]
    NOT?: RealtorScalarWhereWithAggregatesInput | RealtorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Realtor"> | string
    name?: StringWithAggregatesFilter<"Realtor"> | string
  }

  export type MlsPropertyWhereInput = {
    AND?: MlsPropertyWhereInput | MlsPropertyWhereInput[]
    OR?: MlsPropertyWhereInput[]
    NOT?: MlsPropertyWhereInput | MlsPropertyWhereInput[]
    id?: IntFilter<"MlsProperty"> | number
    address?: StringFilter<"MlsProperty"> | string
    type?: StringFilter<"MlsProperty"> | string
    listPrice?: FloatFilter<"MlsProperty"> | number
    agent?: StringFilter<"MlsProperty"> | string
    agentRaw?: StringFilter<"MlsProperty"> | string
    admin?: StringFilter<"MlsProperty"> | string
    listingExp?: StringFilter<"MlsProperty"> | string
    showingInst?: StringFilter<"MlsProperty"> | string
    mlsStatus?: StringFilter<"MlsProperty"> | string
    mlsNum?: StringFilter<"MlsProperty"> | string
    zillow?: StringFilter<"MlsProperty"> | string
    notes?: StringFilter<"MlsProperty"> | string
    country?: StringFilter<"MlsProperty"> | string
    usState?: StringFilter<"MlsProperty"> | string
    city?: StringFilter<"MlsProperty"> | string
    daysListed?: IntFilter<"MlsProperty"> | number
    zillowViews?: IntFilter<"MlsProperty"> | number
    createdAt?: DateTimeFilter<"MlsProperty"> | Date | string
    updatedAt?: DateTimeFilter<"MlsProperty"> | Date | string
  }

  export type MlsPropertyOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    listPrice?: SortOrder
    agent?: SortOrder
    agentRaw?: SortOrder
    admin?: SortOrder
    listingExp?: SortOrder
    showingInst?: SortOrder
    mlsStatus?: SortOrder
    mlsNum?: SortOrder
    zillow?: SortOrder
    notes?: SortOrder
    country?: SortOrder
    usState?: SortOrder
    city?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MlsPropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MlsPropertyWhereInput | MlsPropertyWhereInput[]
    OR?: MlsPropertyWhereInput[]
    NOT?: MlsPropertyWhereInput | MlsPropertyWhereInput[]
    address?: StringFilter<"MlsProperty"> | string
    type?: StringFilter<"MlsProperty"> | string
    listPrice?: FloatFilter<"MlsProperty"> | number
    agent?: StringFilter<"MlsProperty"> | string
    agentRaw?: StringFilter<"MlsProperty"> | string
    admin?: StringFilter<"MlsProperty"> | string
    listingExp?: StringFilter<"MlsProperty"> | string
    showingInst?: StringFilter<"MlsProperty"> | string
    mlsStatus?: StringFilter<"MlsProperty"> | string
    mlsNum?: StringFilter<"MlsProperty"> | string
    zillow?: StringFilter<"MlsProperty"> | string
    notes?: StringFilter<"MlsProperty"> | string
    country?: StringFilter<"MlsProperty"> | string
    usState?: StringFilter<"MlsProperty"> | string
    city?: StringFilter<"MlsProperty"> | string
    daysListed?: IntFilter<"MlsProperty"> | number
    zillowViews?: IntFilter<"MlsProperty"> | number
    createdAt?: DateTimeFilter<"MlsProperty"> | Date | string
    updatedAt?: DateTimeFilter<"MlsProperty"> | Date | string
  }, "id">

  export type MlsPropertyOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    listPrice?: SortOrder
    agent?: SortOrder
    agentRaw?: SortOrder
    admin?: SortOrder
    listingExp?: SortOrder
    showingInst?: SortOrder
    mlsStatus?: SortOrder
    mlsNum?: SortOrder
    zillow?: SortOrder
    notes?: SortOrder
    country?: SortOrder
    usState?: SortOrder
    city?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MlsPropertyCountOrderByAggregateInput
    _avg?: MlsPropertyAvgOrderByAggregateInput
    _max?: MlsPropertyMaxOrderByAggregateInput
    _min?: MlsPropertyMinOrderByAggregateInput
    _sum?: MlsPropertySumOrderByAggregateInput
  }

  export type MlsPropertyScalarWhereWithAggregatesInput = {
    AND?: MlsPropertyScalarWhereWithAggregatesInput | MlsPropertyScalarWhereWithAggregatesInput[]
    OR?: MlsPropertyScalarWhereWithAggregatesInput[]
    NOT?: MlsPropertyScalarWhereWithAggregatesInput | MlsPropertyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MlsProperty"> | number
    address?: StringWithAggregatesFilter<"MlsProperty"> | string
    type?: StringWithAggregatesFilter<"MlsProperty"> | string
    listPrice?: FloatWithAggregatesFilter<"MlsProperty"> | number
    agent?: StringWithAggregatesFilter<"MlsProperty"> | string
    agentRaw?: StringWithAggregatesFilter<"MlsProperty"> | string
    admin?: StringWithAggregatesFilter<"MlsProperty"> | string
    listingExp?: StringWithAggregatesFilter<"MlsProperty"> | string
    showingInst?: StringWithAggregatesFilter<"MlsProperty"> | string
    mlsStatus?: StringWithAggregatesFilter<"MlsProperty"> | string
    mlsNum?: StringWithAggregatesFilter<"MlsProperty"> | string
    zillow?: StringWithAggregatesFilter<"MlsProperty"> | string
    notes?: StringWithAggregatesFilter<"MlsProperty"> | string
    country?: StringWithAggregatesFilter<"MlsProperty"> | string
    usState?: StringWithAggregatesFilter<"MlsProperty"> | string
    city?: StringWithAggregatesFilter<"MlsProperty"> | string
    daysListed?: IntWithAggregatesFilter<"MlsProperty"> | number
    zillowViews?: IntWithAggregatesFilter<"MlsProperty"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MlsProperty"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MlsProperty"> | Date | string
  }

  export type OperationWhereInput = {
    AND?: OperationWhereInput | OperationWhereInput[]
    OR?: OperationWhereInput[]
    NOT?: OperationWhereInput | OperationWhereInput[]
    id?: IntFilter<"Operation"> | number
    address?: StringFilter<"Operation"> | string
    type?: StringFilter<"Operation"> | string
    price?: FloatFilter<"Operation"> | number
    financing?: StringFilter<"Operation"> | string
    agent?: StringFilter<"Operation"> | string
    realtor?: StringFilter<"Operation"> | string
    titleCo?: StringFilter<"Operation"> | string
    clientId?: IntFilter<"Operation"> | number
    buyerName?: StringFilter<"Operation"> | string
    execDate?: StringFilter<"Operation"> | string
    closingDate?: StringFilter<"Operation"> | string
    closingDateISO?: StringFilter<"Operation"> | string
    status?: StringFilter<"Operation"> | string
    commissionPaid?: BoolFilter<"Operation"> | boolean
    compSigned?: StringFilter<"Operation"> | string
    compPct?: FloatFilter<"Operation"> | number
    compFixed?: FloatFilter<"Operation"> | number
    escrow?: StringFilter<"Operation"> | string
    lbp?: StringFilter<"Operation"> | string
    sd?: StringFilter<"Operation"> | string
    flood?: StringFilter<"Operation"> | string
    condoDocs?: StringFilter<"Operation"> | string
    condoRider?: StringFilter<"Operation"> | string
    inspDone?: StringFilter<"Operation"> | string
    inspStatus?: StringFilter<"Operation"> | string
    inspNotes?: StringFilter<"Operation"> | string
    appraisal?: StringFilter<"Operation"> | string
    reinsp?: StringFilter<"Operation"> | string
    pending?: StringFilter<"Operation"> | string
    closingNear?: BoolFilter<"Operation"> | boolean
    isRented?: BoolFilter<"Operation"> | boolean
    leaseAgreementSent?: BoolFilter<"Operation"> | boolean
    estoppelSent?: BoolFilter<"Operation"> | boolean
    createdAt?: DateTimeFilter<"Operation"> | Date | string
    updatedAt?: DateTimeFilter<"Operation"> | Date | string
  }

  export type OperationOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    price?: SortOrder
    financing?: SortOrder
    agent?: SortOrder
    realtor?: SortOrder
    titleCo?: SortOrder
    clientId?: SortOrder
    buyerName?: SortOrder
    execDate?: SortOrder
    closingDate?: SortOrder
    closingDateISO?: SortOrder
    status?: SortOrder
    commissionPaid?: SortOrder
    compSigned?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
    escrow?: SortOrder
    lbp?: SortOrder
    sd?: SortOrder
    flood?: SortOrder
    condoDocs?: SortOrder
    condoRider?: SortOrder
    inspDone?: SortOrder
    inspStatus?: SortOrder
    inspNotes?: SortOrder
    appraisal?: SortOrder
    reinsp?: SortOrder
    pending?: SortOrder
    closingNear?: SortOrder
    isRented?: SortOrder
    leaseAgreementSent?: SortOrder
    estoppelSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OperationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OperationWhereInput | OperationWhereInput[]
    OR?: OperationWhereInput[]
    NOT?: OperationWhereInput | OperationWhereInput[]
    address?: StringFilter<"Operation"> | string
    type?: StringFilter<"Operation"> | string
    price?: FloatFilter<"Operation"> | number
    financing?: StringFilter<"Operation"> | string
    agent?: StringFilter<"Operation"> | string
    realtor?: StringFilter<"Operation"> | string
    titleCo?: StringFilter<"Operation"> | string
    clientId?: IntFilter<"Operation"> | number
    buyerName?: StringFilter<"Operation"> | string
    execDate?: StringFilter<"Operation"> | string
    closingDate?: StringFilter<"Operation"> | string
    closingDateISO?: StringFilter<"Operation"> | string
    status?: StringFilter<"Operation"> | string
    commissionPaid?: BoolFilter<"Operation"> | boolean
    compSigned?: StringFilter<"Operation"> | string
    compPct?: FloatFilter<"Operation"> | number
    compFixed?: FloatFilter<"Operation"> | number
    escrow?: StringFilter<"Operation"> | string
    lbp?: StringFilter<"Operation"> | string
    sd?: StringFilter<"Operation"> | string
    flood?: StringFilter<"Operation"> | string
    condoDocs?: StringFilter<"Operation"> | string
    condoRider?: StringFilter<"Operation"> | string
    inspDone?: StringFilter<"Operation"> | string
    inspStatus?: StringFilter<"Operation"> | string
    inspNotes?: StringFilter<"Operation"> | string
    appraisal?: StringFilter<"Operation"> | string
    reinsp?: StringFilter<"Operation"> | string
    pending?: StringFilter<"Operation"> | string
    closingNear?: BoolFilter<"Operation"> | boolean
    isRented?: BoolFilter<"Operation"> | boolean
    leaseAgreementSent?: BoolFilter<"Operation"> | boolean
    estoppelSent?: BoolFilter<"Operation"> | boolean
    createdAt?: DateTimeFilter<"Operation"> | Date | string
    updatedAt?: DateTimeFilter<"Operation"> | Date | string
  }, "id">

  export type OperationOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    price?: SortOrder
    financing?: SortOrder
    agent?: SortOrder
    realtor?: SortOrder
    titleCo?: SortOrder
    clientId?: SortOrder
    buyerName?: SortOrder
    execDate?: SortOrder
    closingDate?: SortOrder
    closingDateISO?: SortOrder
    status?: SortOrder
    commissionPaid?: SortOrder
    compSigned?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
    escrow?: SortOrder
    lbp?: SortOrder
    sd?: SortOrder
    flood?: SortOrder
    condoDocs?: SortOrder
    condoRider?: SortOrder
    inspDone?: SortOrder
    inspStatus?: SortOrder
    inspNotes?: SortOrder
    appraisal?: SortOrder
    reinsp?: SortOrder
    pending?: SortOrder
    closingNear?: SortOrder
    isRented?: SortOrder
    leaseAgreementSent?: SortOrder
    estoppelSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OperationCountOrderByAggregateInput
    _avg?: OperationAvgOrderByAggregateInput
    _max?: OperationMaxOrderByAggregateInput
    _min?: OperationMinOrderByAggregateInput
    _sum?: OperationSumOrderByAggregateInput
  }

  export type OperationScalarWhereWithAggregatesInput = {
    AND?: OperationScalarWhereWithAggregatesInput | OperationScalarWhereWithAggregatesInput[]
    OR?: OperationScalarWhereWithAggregatesInput[]
    NOT?: OperationScalarWhereWithAggregatesInput | OperationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Operation"> | number
    address?: StringWithAggregatesFilter<"Operation"> | string
    type?: StringWithAggregatesFilter<"Operation"> | string
    price?: FloatWithAggregatesFilter<"Operation"> | number
    financing?: StringWithAggregatesFilter<"Operation"> | string
    agent?: StringWithAggregatesFilter<"Operation"> | string
    realtor?: StringWithAggregatesFilter<"Operation"> | string
    titleCo?: StringWithAggregatesFilter<"Operation"> | string
    clientId?: IntWithAggregatesFilter<"Operation"> | number
    buyerName?: StringWithAggregatesFilter<"Operation"> | string
    execDate?: StringWithAggregatesFilter<"Operation"> | string
    closingDate?: StringWithAggregatesFilter<"Operation"> | string
    closingDateISO?: StringWithAggregatesFilter<"Operation"> | string
    status?: StringWithAggregatesFilter<"Operation"> | string
    commissionPaid?: BoolWithAggregatesFilter<"Operation"> | boolean
    compSigned?: StringWithAggregatesFilter<"Operation"> | string
    compPct?: FloatWithAggregatesFilter<"Operation"> | number
    compFixed?: FloatWithAggregatesFilter<"Operation"> | number
    escrow?: StringWithAggregatesFilter<"Operation"> | string
    lbp?: StringWithAggregatesFilter<"Operation"> | string
    sd?: StringWithAggregatesFilter<"Operation"> | string
    flood?: StringWithAggregatesFilter<"Operation"> | string
    condoDocs?: StringWithAggregatesFilter<"Operation"> | string
    condoRider?: StringWithAggregatesFilter<"Operation"> | string
    inspDone?: StringWithAggregatesFilter<"Operation"> | string
    inspStatus?: StringWithAggregatesFilter<"Operation"> | string
    inspNotes?: StringWithAggregatesFilter<"Operation"> | string
    appraisal?: StringWithAggregatesFilter<"Operation"> | string
    reinsp?: StringWithAggregatesFilter<"Operation"> | string
    pending?: StringWithAggregatesFilter<"Operation"> | string
    closingNear?: BoolWithAggregatesFilter<"Operation"> | boolean
    isRented?: BoolWithAggregatesFilter<"Operation"> | boolean
    leaseAgreementSent?: BoolWithAggregatesFilter<"Operation"> | boolean
    estoppelSent?: BoolWithAggregatesFilter<"Operation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Operation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Operation"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    password: string
    role: string
    name: string
    initials: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    role: string
    name: string
    initials: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    role: string
    name: string
    initials: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateInput = {
    id: string
    name: string
    active?: number
    closed?: number
  }

  export type AgentUncheckedCreateInput = {
    id: string
    name: string
    active?: number
    closed?: number
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: IntFieldUpdateOperationsInput | number
    closed?: IntFieldUpdateOperationsInput | number
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: IntFieldUpdateOperationsInput | number
    closed?: IntFieldUpdateOperationsInput | number
  }

  export type AgentCreateManyInput = {
    id: string
    name: string
    active?: number
    closed?: number
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: IntFieldUpdateOperationsInput | number
    closed?: IntFieldUpdateOperationsInput | number
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: IntFieldUpdateOperationsInput | number
    closed?: IntFieldUpdateOperationsInput | number
  }

  export type RealtorCreateInput = {
    id: string
    name: string
  }

  export type RealtorUncheckedCreateInput = {
    id: string
    name: string
  }

  export type RealtorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RealtorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RealtorCreateManyInput = {
    id: string
    name: string
  }

  export type RealtorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RealtorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MlsPropertyCreateInput = {
    address: string
    type?: string
    listPrice: number
    agent: string
    agentRaw?: string
    admin?: string
    listingExp?: string
    showingInst?: string
    mlsStatus?: string
    mlsNum?: string
    zillow?: string
    notes?: string
    country?: string
    usState?: string
    city?: string
    daysListed?: number
    zillowViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MlsPropertyUncheckedCreateInput = {
    id?: number
    address: string
    type?: string
    listPrice: number
    agent: string
    agentRaw?: string
    admin?: string
    listingExp?: string
    showingInst?: string
    mlsStatus?: string
    mlsNum?: string
    zillow?: string
    notes?: string
    country?: string
    usState?: string
    city?: string
    daysListed?: number
    zillowViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MlsPropertyUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    listPrice?: FloatFieldUpdateOperationsInput | number
    agent?: StringFieldUpdateOperationsInput | string
    agentRaw?: StringFieldUpdateOperationsInput | string
    admin?: StringFieldUpdateOperationsInput | string
    listingExp?: StringFieldUpdateOperationsInput | string
    showingInst?: StringFieldUpdateOperationsInput | string
    mlsStatus?: StringFieldUpdateOperationsInput | string
    mlsNum?: StringFieldUpdateOperationsInput | string
    zillow?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    usState?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    daysListed?: IntFieldUpdateOperationsInput | number
    zillowViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MlsPropertyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    listPrice?: FloatFieldUpdateOperationsInput | number
    agent?: StringFieldUpdateOperationsInput | string
    agentRaw?: StringFieldUpdateOperationsInput | string
    admin?: StringFieldUpdateOperationsInput | string
    listingExp?: StringFieldUpdateOperationsInput | string
    showingInst?: StringFieldUpdateOperationsInput | string
    mlsStatus?: StringFieldUpdateOperationsInput | string
    mlsNum?: StringFieldUpdateOperationsInput | string
    zillow?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    usState?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    daysListed?: IntFieldUpdateOperationsInput | number
    zillowViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MlsPropertyCreateManyInput = {
    id?: number
    address: string
    type?: string
    listPrice: number
    agent: string
    agentRaw?: string
    admin?: string
    listingExp?: string
    showingInst?: string
    mlsStatus?: string
    mlsNum?: string
    zillow?: string
    notes?: string
    country?: string
    usState?: string
    city?: string
    daysListed?: number
    zillowViews?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MlsPropertyUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    listPrice?: FloatFieldUpdateOperationsInput | number
    agent?: StringFieldUpdateOperationsInput | string
    agentRaw?: StringFieldUpdateOperationsInput | string
    admin?: StringFieldUpdateOperationsInput | string
    listingExp?: StringFieldUpdateOperationsInput | string
    showingInst?: StringFieldUpdateOperationsInput | string
    mlsStatus?: StringFieldUpdateOperationsInput | string
    mlsNum?: StringFieldUpdateOperationsInput | string
    zillow?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    usState?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    daysListed?: IntFieldUpdateOperationsInput | number
    zillowViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MlsPropertyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    listPrice?: FloatFieldUpdateOperationsInput | number
    agent?: StringFieldUpdateOperationsInput | string
    agentRaw?: StringFieldUpdateOperationsInput | string
    admin?: StringFieldUpdateOperationsInput | string
    listingExp?: StringFieldUpdateOperationsInput | string
    showingInst?: StringFieldUpdateOperationsInput | string
    mlsStatus?: StringFieldUpdateOperationsInput | string
    mlsNum?: StringFieldUpdateOperationsInput | string
    zillow?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    usState?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    daysListed?: IntFieldUpdateOperationsInput | number
    zillowViews?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationCreateInput = {
    address: string
    type?: string
    price?: number
    financing?: string
    agent?: string
    realtor?: string
    titleCo?: string
    clientId?: number
    buyerName?: string
    execDate?: string
    closingDate?: string
    closingDateISO?: string
    status?: string
    commissionPaid?: boolean
    compSigned?: string
    compPct?: number
    compFixed?: number
    escrow?: string
    lbp?: string
    sd?: string
    flood?: string
    condoDocs?: string
    condoRider?: string
    inspDone?: string
    inspStatus?: string
    inspNotes?: string
    appraisal?: string
    reinsp?: string
    pending?: string
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OperationUncheckedCreateInput = {
    id?: number
    address: string
    type?: string
    price?: number
    financing?: string
    agent?: string
    realtor?: string
    titleCo?: string
    clientId?: number
    buyerName?: string
    execDate?: string
    closingDate?: string
    closingDateISO?: string
    status?: string
    commissionPaid?: boolean
    compSigned?: string
    compPct?: number
    compFixed?: number
    escrow?: string
    lbp?: string
    sd?: string
    flood?: string
    condoDocs?: string
    condoRider?: string
    inspDone?: string
    inspStatus?: string
    inspNotes?: string
    appraisal?: string
    reinsp?: string
    pending?: string
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OperationUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    financing?: StringFieldUpdateOperationsInput | string
    agent?: StringFieldUpdateOperationsInput | string
    realtor?: StringFieldUpdateOperationsInput | string
    titleCo?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    buyerName?: StringFieldUpdateOperationsInput | string
    execDate?: StringFieldUpdateOperationsInput | string
    closingDate?: StringFieldUpdateOperationsInput | string
    closingDateISO?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    compSigned?: StringFieldUpdateOperationsInput | string
    compPct?: FloatFieldUpdateOperationsInput | number
    compFixed?: FloatFieldUpdateOperationsInput | number
    escrow?: StringFieldUpdateOperationsInput | string
    lbp?: StringFieldUpdateOperationsInput | string
    sd?: StringFieldUpdateOperationsInput | string
    flood?: StringFieldUpdateOperationsInput | string
    condoDocs?: StringFieldUpdateOperationsInput | string
    condoRider?: StringFieldUpdateOperationsInput | string
    inspDone?: StringFieldUpdateOperationsInput | string
    inspStatus?: StringFieldUpdateOperationsInput | string
    inspNotes?: StringFieldUpdateOperationsInput | string
    appraisal?: StringFieldUpdateOperationsInput | string
    reinsp?: StringFieldUpdateOperationsInput | string
    pending?: StringFieldUpdateOperationsInput | string
    closingNear?: BoolFieldUpdateOperationsInput | boolean
    isRented?: BoolFieldUpdateOperationsInput | boolean
    leaseAgreementSent?: BoolFieldUpdateOperationsInput | boolean
    estoppelSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    financing?: StringFieldUpdateOperationsInput | string
    agent?: StringFieldUpdateOperationsInput | string
    realtor?: StringFieldUpdateOperationsInput | string
    titleCo?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    buyerName?: StringFieldUpdateOperationsInput | string
    execDate?: StringFieldUpdateOperationsInput | string
    closingDate?: StringFieldUpdateOperationsInput | string
    closingDateISO?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    compSigned?: StringFieldUpdateOperationsInput | string
    compPct?: FloatFieldUpdateOperationsInput | number
    compFixed?: FloatFieldUpdateOperationsInput | number
    escrow?: StringFieldUpdateOperationsInput | string
    lbp?: StringFieldUpdateOperationsInput | string
    sd?: StringFieldUpdateOperationsInput | string
    flood?: StringFieldUpdateOperationsInput | string
    condoDocs?: StringFieldUpdateOperationsInput | string
    condoRider?: StringFieldUpdateOperationsInput | string
    inspDone?: StringFieldUpdateOperationsInput | string
    inspStatus?: StringFieldUpdateOperationsInput | string
    inspNotes?: StringFieldUpdateOperationsInput | string
    appraisal?: StringFieldUpdateOperationsInput | string
    reinsp?: StringFieldUpdateOperationsInput | string
    pending?: StringFieldUpdateOperationsInput | string
    closingNear?: BoolFieldUpdateOperationsInput | boolean
    isRented?: BoolFieldUpdateOperationsInput | boolean
    leaseAgreementSent?: BoolFieldUpdateOperationsInput | boolean
    estoppelSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationCreateManyInput = {
    id?: number
    address: string
    type?: string
    price?: number
    financing?: string
    agent?: string
    realtor?: string
    titleCo?: string
    clientId?: number
    buyerName?: string
    execDate?: string
    closingDate?: string
    closingDateISO?: string
    status?: string
    commissionPaid?: boolean
    compSigned?: string
    compPct?: number
    compFixed?: number
    escrow?: string
    lbp?: string
    sd?: string
    flood?: string
    condoDocs?: string
    condoRider?: string
    inspDone?: string
    inspStatus?: string
    inspNotes?: string
    appraisal?: string
    reinsp?: string
    pending?: string
    closingNear?: boolean
    isRented?: boolean
    leaseAgreementSent?: boolean
    estoppelSent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OperationUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    financing?: StringFieldUpdateOperationsInput | string
    agent?: StringFieldUpdateOperationsInput | string
    realtor?: StringFieldUpdateOperationsInput | string
    titleCo?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    buyerName?: StringFieldUpdateOperationsInput | string
    execDate?: StringFieldUpdateOperationsInput | string
    closingDate?: StringFieldUpdateOperationsInput | string
    closingDateISO?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    compSigned?: StringFieldUpdateOperationsInput | string
    compPct?: FloatFieldUpdateOperationsInput | number
    compFixed?: FloatFieldUpdateOperationsInput | number
    escrow?: StringFieldUpdateOperationsInput | string
    lbp?: StringFieldUpdateOperationsInput | string
    sd?: StringFieldUpdateOperationsInput | string
    flood?: StringFieldUpdateOperationsInput | string
    condoDocs?: StringFieldUpdateOperationsInput | string
    condoRider?: StringFieldUpdateOperationsInput | string
    inspDone?: StringFieldUpdateOperationsInput | string
    inspStatus?: StringFieldUpdateOperationsInput | string
    inspNotes?: StringFieldUpdateOperationsInput | string
    appraisal?: StringFieldUpdateOperationsInput | string
    reinsp?: StringFieldUpdateOperationsInput | string
    pending?: StringFieldUpdateOperationsInput | string
    closingNear?: BoolFieldUpdateOperationsInput | boolean
    isRented?: BoolFieldUpdateOperationsInput | boolean
    leaseAgreementSent?: BoolFieldUpdateOperationsInput | boolean
    estoppelSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    financing?: StringFieldUpdateOperationsInput | string
    agent?: StringFieldUpdateOperationsInput | string
    realtor?: StringFieldUpdateOperationsInput | string
    titleCo?: StringFieldUpdateOperationsInput | string
    clientId?: IntFieldUpdateOperationsInput | number
    buyerName?: StringFieldUpdateOperationsInput | string
    execDate?: StringFieldUpdateOperationsInput | string
    closingDate?: StringFieldUpdateOperationsInput | string
    closingDateISO?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    compSigned?: StringFieldUpdateOperationsInput | string
    compPct?: FloatFieldUpdateOperationsInput | number
    compFixed?: FloatFieldUpdateOperationsInput | number
    escrow?: StringFieldUpdateOperationsInput | string
    lbp?: StringFieldUpdateOperationsInput | string
    sd?: StringFieldUpdateOperationsInput | string
    flood?: StringFieldUpdateOperationsInput | string
    condoDocs?: StringFieldUpdateOperationsInput | string
    condoRider?: StringFieldUpdateOperationsInput | string
    inspDone?: StringFieldUpdateOperationsInput | string
    inspStatus?: StringFieldUpdateOperationsInput | string
    inspNotes?: StringFieldUpdateOperationsInput | string
    appraisal?: StringFieldUpdateOperationsInput | string
    reinsp?: StringFieldUpdateOperationsInput | string
    pending?: StringFieldUpdateOperationsInput | string
    closingNear?: BoolFieldUpdateOperationsInput | boolean
    isRented?: BoolFieldUpdateOperationsInput | boolean
    leaseAgreementSent?: BoolFieldUpdateOperationsInput | boolean
    estoppelSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    initials?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    initials?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    initials?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    closed?: SortOrder
  }

  export type AgentAvgOrderByAggregateInput = {
    active?: SortOrder
    closed?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    closed?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    closed?: SortOrder
  }

  export type AgentSumOrderByAggregateInput = {
    active?: SortOrder
    closed?: SortOrder
  }

  export type RealtorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RealtorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RealtorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MlsPropertyCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    listPrice?: SortOrder
    agent?: SortOrder
    agentRaw?: SortOrder
    admin?: SortOrder
    listingExp?: SortOrder
    showingInst?: SortOrder
    mlsStatus?: SortOrder
    mlsNum?: SortOrder
    zillow?: SortOrder
    notes?: SortOrder
    country?: SortOrder
    usState?: SortOrder
    city?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MlsPropertyAvgOrderByAggregateInput = {
    id?: SortOrder
    listPrice?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
  }

  export type MlsPropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    listPrice?: SortOrder
    agent?: SortOrder
    agentRaw?: SortOrder
    admin?: SortOrder
    listingExp?: SortOrder
    showingInst?: SortOrder
    mlsStatus?: SortOrder
    mlsNum?: SortOrder
    zillow?: SortOrder
    notes?: SortOrder
    country?: SortOrder
    usState?: SortOrder
    city?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MlsPropertyMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    listPrice?: SortOrder
    agent?: SortOrder
    agentRaw?: SortOrder
    admin?: SortOrder
    listingExp?: SortOrder
    showingInst?: SortOrder
    mlsStatus?: SortOrder
    mlsNum?: SortOrder
    zillow?: SortOrder
    notes?: SortOrder
    country?: SortOrder
    usState?: SortOrder
    city?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MlsPropertySumOrderByAggregateInput = {
    id?: SortOrder
    listPrice?: SortOrder
    daysListed?: SortOrder
    zillowViews?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OperationCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    price?: SortOrder
    financing?: SortOrder
    agent?: SortOrder
    realtor?: SortOrder
    titleCo?: SortOrder
    clientId?: SortOrder
    buyerName?: SortOrder
    execDate?: SortOrder
    closingDate?: SortOrder
    closingDateISO?: SortOrder
    status?: SortOrder
    commissionPaid?: SortOrder
    compSigned?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
    escrow?: SortOrder
    lbp?: SortOrder
    sd?: SortOrder
    flood?: SortOrder
    condoDocs?: SortOrder
    condoRider?: SortOrder
    inspDone?: SortOrder
    inspStatus?: SortOrder
    inspNotes?: SortOrder
    appraisal?: SortOrder
    reinsp?: SortOrder
    pending?: SortOrder
    closingNear?: SortOrder
    isRented?: SortOrder
    leaseAgreementSent?: SortOrder
    estoppelSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OperationAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    clientId?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
  }

  export type OperationMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    price?: SortOrder
    financing?: SortOrder
    agent?: SortOrder
    realtor?: SortOrder
    titleCo?: SortOrder
    clientId?: SortOrder
    buyerName?: SortOrder
    execDate?: SortOrder
    closingDate?: SortOrder
    closingDateISO?: SortOrder
    status?: SortOrder
    commissionPaid?: SortOrder
    compSigned?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
    escrow?: SortOrder
    lbp?: SortOrder
    sd?: SortOrder
    flood?: SortOrder
    condoDocs?: SortOrder
    condoRider?: SortOrder
    inspDone?: SortOrder
    inspStatus?: SortOrder
    inspNotes?: SortOrder
    appraisal?: SortOrder
    reinsp?: SortOrder
    pending?: SortOrder
    closingNear?: SortOrder
    isRented?: SortOrder
    leaseAgreementSent?: SortOrder
    estoppelSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OperationMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    type?: SortOrder
    price?: SortOrder
    financing?: SortOrder
    agent?: SortOrder
    realtor?: SortOrder
    titleCo?: SortOrder
    clientId?: SortOrder
    buyerName?: SortOrder
    execDate?: SortOrder
    closingDate?: SortOrder
    closingDateISO?: SortOrder
    status?: SortOrder
    commissionPaid?: SortOrder
    compSigned?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
    escrow?: SortOrder
    lbp?: SortOrder
    sd?: SortOrder
    flood?: SortOrder
    condoDocs?: SortOrder
    condoRider?: SortOrder
    inspDone?: SortOrder
    inspStatus?: SortOrder
    inspNotes?: SortOrder
    appraisal?: SortOrder
    reinsp?: SortOrder
    pending?: SortOrder
    closingNear?: SortOrder
    isRented?: SortOrder
    leaseAgreementSent?: SortOrder
    estoppelSent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OperationSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    clientId?: SortOrder
    compPct?: SortOrder
    compFixed?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}