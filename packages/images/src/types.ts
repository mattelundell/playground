import { unknown, z } from 'zod';

const ImageProps = z.object({
  name: z.string(),
});

const ImageShape = z.object({
  shape: z.object({
    height: z.coerce.number(),
    width: z.coerce.number(),
  }),
});

export namespace Variant {
  export enum State {
    Original = 'original',
    Transformed = 'transformed',
  }
}

export namespace Extension {
  export enum Type {
    Jpg = '.jpg',
    Jpeg = '.jpeg',
    Png = '.png',
    Gif = '.gif',
  }
}

export namespace Original {
  export namespace Schemas {
    export const png = z
      .object({
        variant: z.literal(Variant.State.Original),
        extension: z.literal(Extension.Type.Png),
      })
      .extend(ImageProps.shape)
      .extend(ImageShape.shape);
  }

  export type Png = z.infer<typeof Schemas.png>;

  export namespace Builder {
    export const png = (args: {
      name: string;
      extension: string;
      shape: {
        height: number;
        width: number;
      };
    }): Image<Png> => ({
      detail: {
        name: args.name,
        extension: Extension.Type.Png,
        variant: Variant.State.Original,
        shape: {
          height: args.shape.height,
          width: args.shape.width,
        },
      },
    });
  }
}

export namespace Transformed {
  export namespace Schemas {
    export const png = z
      .object({
        variant: z.literal(Variant.State.Transformed),
        extension: z.literal(Extension.Type.Png),
      })
      .extend(ImageProps.shape)
      .extend(ImageShape.shape);
  }

  export type Png = z.infer<typeof Schemas.png>;

  export namespace Builder {
    export const png = (args: {
      name: string;
      extension: string;
      shape: {
        height: number;
        width: number;
      };
    }): Image<Png> => ({
      detail: {
        name: args.name,
        extension: Extension.Type.Png,
        variant: Variant.State.Transformed,
        shape: {
          height: args.shape.height,
          width: args.shape.width,
        },
      },
    });
  }
}

export type Image<D> = {
  detail: D;
};

const DetailSchema = z.discriminatedUnion('variant', [
  Original.Schemas.png,
  Transformed.Schemas.png,
]);

export type Detail = z.infer<typeof DetailSchema>;

const ImageSchema = z.object({
  detail: DetailSchema,
});

export namespace Parser {
  export const map = <
    T extends Detail['variant'],
    D = Extract<Detail, { variant: T }>,
  >(
    image: unknown,
    variant: T,
  ): Image<D> | null => {
    const res = ImageSchema.parse(image);

    if (res.detail.variant != variant) return null;

    return {
      detail: res.detail as D,
    };
  };
}
