"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

export const handleRegisterSubmit = async (formData) => {
  try {
    const { name, username, email, password, country, contactNumber, address } =
      await formData;

    // Validate input data (you can use a library like Joi or custom validation)
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !country ||
      !contactNumber ||
      !address
    ) {
      return { result: "required" };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { contactNumber }],
      },
    });

    if (existingUser) {
      return { result: "user_exists" };
    }

    const saltIndex = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, saltIndex);
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        country,
        contactNumber,
        address,
        status: true,
      },
    });

    return { result: "success" };
  } catch (error) {
    console.error("Failed to register", error);
    return { result: "failed" };
  }
};

export const handleUserData = async () => {
  const session = await auth();

  if (session?.user) {
    if (session?.user?.role === "admin") {
      try {
        const result = await prisma.user.findFirst({
          where: {
            id: session?.user?.id,
          },
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            country: true,
            contactNumber: true,
            address: true,
            status: true,
            role: true,
            profilePic: true,
          },
        });
        console.log(result);
        return { result };
      } catch (error) {
        console.error(error);
        return { result: "failed" };
      }
    } else {
      return { result: "Not Autherized" };
    }
  } else {
    return { result: "Not Autherized" };
  }
};

export async function handleOverviewData() {
  try {
    const currentDate = new Date();
    const thisMonthDate = new Date();

    thisMonthDate.setMonth(currentDate.getMonth());
    thisMonthDate.setDate(1);
    thisMonthDate.setHours(0, 0, 0, 0);

    if (currentDate.getMonth() === 0) {
      thisMonthDate.setFullYear(currentDate.getFullYear() - 1);
    }

    const [
      currentUsersCount,
      currentVendorsCount,
      currentPackagesCount,
      currentOrdersCount,
      currentRevenueN,
      currentReviewsCount,
      currentRatingsCount,
      currentComplaintsCount,
      currentQueriesCount,
      currentFeedbacksCount,
      currentSuggestionsCount,
      thisMonthUsersCount,
      thisMonthVendorsCount,
      thisMonthPackagesCount,
      thisMonthOrdersCount,
      thisMonthRevenueN,
      thisMonthReviewsCount,
      thisMonthRatingsCount,
      thisMonthComplaintsCount,
      thisMonthQueriesCount,
      thisMonthFeedbacksCount,
      thisMonthSuggestionsCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.TravelPackage.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
      prisma.review.count({
        where: {
          reviewText: {
            not: null,
          },
        },
      }),
      prisma.review.count(),
      prisma.complaint.count(),
      prisma.query.count(),
      prisma.feedback.count(),
      prisma.suggestion.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.vendor.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.TravelPackage.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.order.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.review.count({
        where: {
          reviewText: {
            not: null,
          },
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.review.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.complaint.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.query.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.feedback.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
      prisma.suggestion.count({
        where: {
          createdAt: {
            gt: thisMonthDate,
          },
        },
      }),
    ]);

    const currentRevenue = currentRevenueN._sum.totalAmount || 0;
    const thisMonthRevenue = thisMonthRevenueN._sum.totalAmount || 0;

    const percentChange = (currentCount, newThisMonthCount) => {
      if (currentCount === 0) return 0;
      return ((newThisMonthCount / (currentCount - newThisMonthCount)) * 100);
    };
    
    // Usage:
    const percentThisUsersCount = percentChange(currentUsersCount, thisMonthUsersCount);
    const percentThisVendorsCount = percentChange(currentVendorsCount, thisMonthVendorsCount);
    const percentThisPackagesCount = percentChange(currentPackagesCount, thisMonthPackagesCount);
    const percentThisOrdersCount = percentChange(currentOrdersCount, thisMonthOrdersCount);
    const percentThisRevenue = percentChange(currentRevenue, thisMonthRevenue);
    const percentThisReviewsCount = percentChange(currentReviewsCount, thisMonthReviewsCount);
    const percentThisRatingsCount = percentChange(currentRatingsCount, thisMonthRatingsCount);
    const percentThisComplaintsCount = percentChange(currentComplaintsCount, thisMonthComplaintsCount);
    const percentThisQueriesCount = percentChange(currentQueriesCount, thisMonthQueriesCount);
    const percentThisFeedbacksCount = percentChange(currentFeedbacksCount, thisMonthFeedbacksCount);
    const percentThisSuggestionsCount = percentChange(currentSuggestionsCount, thisMonthSuggestionsCount);

    return {
      currentUsersCount,
      currentVendorsCount,
      currentPackagesCount,
      currentOrdersCount,
      currentRevenue,
      currentReviewsCount,
      currentRatingsCount,
      currentComplaintsCount,
      currentQueriesCount,
      currentFeedbacksCount,
      currentSuggestionsCount,
      thisMonthUsersCount,
      thisMonthVendorsCount,
      thisMonthPackagesCount,
      thisMonthOrdersCount,
      thisMonthRevenue,
      thisMonthReviewsCount,
      thisMonthRatingsCount,
      thisMonthComplaintsCount,
      thisMonthQueriesCount,
      thisMonthFeedbacksCount,
      thisMonthSuggestionsCount,
      percentThisUsersCount,
      percentThisVendorsCount,
      percentThisPackagesCount,
      percentThisOrdersCount,
      percentThisRevenue,
      percentThisReviewsCount,
      percentThisRatingsCount,
      percentThisComplaintsCount,
      percentThisQueriesCount,
      percentThisFeedbacksCount,
      percentThisSuggestionsCount,
    };
  } catch (error) {
    console.error("Error fetching overview data:", error);
    throw error;
  }
}
