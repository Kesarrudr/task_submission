import { prisma } from "./prisma.client";

const dataBaseInitialize = async (records: []) => {
  if (!records || records.length === 0) {
    return false;
  }
  try {
    //TODO: handle the dupliate entries
    await prisma.dataTable.createMany({
      data: records.map((record) => ({
        data: record,
      })),
      skipDuplicates: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const getProductTranscations = async (
  search: string,
  page: number,
  perPage: number,
  saleMonth: string,
) => {
  const month = `-${String(saleMonth).padStart(2, "0")}-`;

  try {
    const products = await prisma.dataTable.findMany({
      where: {
        AND: [
          {
            data: {
              path: ["dateOfSale"],
              string_contains: month,
            },
          },
        ],
        OR: search
          ? [
              {
                data: {
                  path: ["title"],
                  string_contains: search,
                },
              },
              {
                data: {
                  path: ["description"],
                  string_contains: search,
                },
              },
              {
                data: {
                  path: ["price"],
                  equals: parseFloat(search),
                },
              },
            ]
          : undefined,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return products;
  } catch (error) {
    console.log("Actual Error", error);
    return null;
  }
};

interface ProductData {
  id: string;
  productID: string;
  price: number;
  sold: boolean;
}

const getmonthlydata = async (validMonth: string) => {
  const month = `-${String(validMonth).padStart(2, "0")}-`;

  try {
    const response = await prisma.dataTable.findMany({
      where: {
        data: {
          path: ["dateOfSale"],
          string_contains: month,
        },
      },
    });

    const products: ProductData[] = response.map(
      (product: { id: string; data: any }) => {
        return {
          id: product.id,
          productID: product.data.id,
          price: product.data.price,
          sold: product.data.sold,
        };
      },
    );

    return products;
  } catch (error) {
    console.log("Actual Error", error);
    return null;
  }
};

interface ProductCategorie {
  id: string;
  productID: string;
  category: string;
}

const getProductCategories = async (validMonth: string) => {
  const month = `-${String(validMonth).padStart(2, "0")}-`;

  try {
    const response = await prisma.dataTable.findMany({
      where: {
        data: {
          path: ["dateOfSale"],
          string_contains: month,
        },
      },
    });

    const products: ProductCategorie[] = response.map(
      (product: { data: any; id: string }) => {
        return {
          id: product.id,
          productID: product.data.id,
          category: product.data.category,
        };
      },
    );
    return products;
  } catch (error) {
    return null;
  }
};

export {
  dataBaseInitialize,
  getmonthlydata,
  getProductCategories,
  getProductTranscations,
  ProductData,
  ProductCategorie,
};
