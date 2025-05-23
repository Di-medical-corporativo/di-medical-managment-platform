import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { AttendanceType } from "../../../Attendance/domain/AttendanceType";
import { JustificationStatusEnum } from "../../../Attendance/domain/JustificationStatus";
import { UserId } from "../../../User/domain/UserId";
import { AnalyticsRepository } from "../../domain/AnalyticsRepository";
import { FromDate } from "../../domain/FromDate";
import { ToDate } from "../../domain/ToDate";

export class PrismaAnalyticsRepository implements AnalyticsRepository {
  async userGeneralReport(userId: UserId, from: FromDate, toDate: ToDate): Promise<{
    absenceCount: number,
    delayCount: number,
    justificationApprovedCount: number,
    justificationPendingCount: number,
    justificationRejectedCount: number,
    absenceTotalCount: number,
    delayTotalCount: number,
    issuesGroupedByDate: Record<string, number>,
    vacationPermitCount: number,
    sickPermitCount: number,
    personalPermitCount: number,
    pendingPermitCount: number,
    approvedPermitCount: number,
    rejectedPermitCount: number,
    assignedTaskCount: number,
    inProgressTaskCount: number,
    completedTaskCount: number,
    pastDueTaskCount: number,
    pointDoneTotalCount: number,
    pointProblemTotalCount: number,
  }> {

    const [
      absenceCount,
      delayCount,
      justificationApprovedCount,
      justificationPendingCount,
      justificationRejectedCount,
      absenceTotalCount,
      delayTotalCount,
      groupedAssitenceIssuesCount,
      vacationPermitCount,
      sickPermitCount,
      personalPermitCount,
      pendingPermitCount,
      approvedPermitCount,
      rejectedPermitCount,
      assignedTaskCount,
      inProgressTaskCount,
      completedTaskCount,
      pastDueTaskCount,
      pointDoneTotalCount,
      pointProblemTotalCount,
    ] = await Promise.all([
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'absence-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          },
          OR: [
            { isJustified: false },
            {
              isJustified: true,
              justification: {
                status: { in: ['pending-justification', 'rejected-justification'] },
              },
            },
          ],
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'delay-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          },
          OR: [
            { isJustified: false },
            {
              isJustified: true,
              justification: {
                status: { in: ['pending-justification', 'rejected-justification'] },
              },
            },
          ],
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'approved-justification',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'pending-justification',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.justification.count({
        where: {
          issue: {
            userId: userId.toString(),
          },
          status: 'rejected-justification',
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'absence-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.attendanceIssue.count({
        where: {
          userId: userId.toString(),
          type: 'delay-issue',
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
      }),
      prisma.attendanceIssue.groupBy({
        by: ['date'],
        _count: {
          id: true
        },
        where: {
          userId: userId.toString(),
          date: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
        orderBy: {
          date: 'asc'
        }
      }),

      // PERMITS
      prisma.permit.count({
        where: {
          type: 'vacation-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          type: 'sick-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          type: 'personal-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          status: 'pending-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          status: 'approved-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.permit.count({
        where: {
          status: 'rejected-permit',
          userId: userId.toString(),
          createdAt: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),

      //TASKS
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'assigned',
          dueTo: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'in-progress',
          dueTo: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'completed',
          dueTo: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.task.count({
        where: {
          userAssignedId: userId.toString(),
          status: 'pastdue',
          dueTo: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),

      // point
      prisma.point.count({
        where: {
          userId: userId.toString(),
          status: 'completed',
          itinerary: {
            done: true,
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          }
        }
      }),

      prisma.point.count({
        where: {
          userId: userId.toString(),
          status: 'point-has-problem',
          itinerary: {
            done: true,
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          }
        }
      }),
    ]);

    let shouldGroupBy = from.daysDifferenceWith(toDate) < 30 ? 'day' : 'month';

    let issuesGroupedByDate = groupedAssitenceIssuesCount.reduce<Record<string, number>>((acc, issue) => {
      let key: string;

      if (shouldGroupBy == 'day') {
        key = issue.date.toLocaleDateString('es-MX');
      } else {
        const month = issue.date.getMonth() + 1;
        const year = issue.date.getFullYear();

        key = `${year}-${month.toString().padStart(2, '0')}`;
      }

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += issue._count.id;

      return acc;
    }, {});

    return {
      absenceCount,
      delayCount,
      justificationApprovedCount,
      justificationPendingCount,
      justificationRejectedCount,
      absenceTotalCount,
      delayTotalCount,
      issuesGroupedByDate,
      vacationPermitCount,
      sickPermitCount,
      personalPermitCount,
      pendingPermitCount,
      approvedPermitCount,
      rejectedPermitCount,
      assignedTaskCount,
      inProgressTaskCount,
      completedTaskCount,
      pastDueTaskCount,
      pointDoneTotalCount,
      pointProblemTotalCount
    }
  }

  // --------------------------------------------------------------

  async itineraryGeneralReport(from: FromDate, toDate: ToDate): Promise<{
    totalItineraryCount: number,
    totalPointsCount: number,
    totalPointProblemCount: number,
    averagePointPerItinerary: number | string,
    topFiveOperators: { fullName: string; totalPoints: number }[];
    topFiveClients: { name: string; totalPoints: number }[]
    routePointCount: number,
    parcelPointCount: number,
    collectPointCount: number,
    aggregatedPointsByDate: Record<string, number>,
    pointAnswerSurveyCount: number,
    invoiceCount: number,
    averageInvoicePerPoint: number | string,
    averageErrorPointPerItinerary: string | number
  }> {
    const [
      totalItineraryCount,
      totalPointsCount,
      totalPointProblemCount,
      topFiveOperators,
      topFiveClients,
      routePointCount,
      parcelPointCount,
      collectPointCount,
      groupedItineraries,
      pointAnswerSurveyCount,
      invoiceCount
    ] = await Promise.all([
      prisma.itinerary.count({
        where: {
          scheduleDate: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        }
      }),
      prisma.point.count({
        where: {
          itinerary: {
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          }
        }
      }),
      prisma.point.count({
        where: {
          itinerary: {
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          },
          problem: true
        }
      }),
      prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          _count: {
            select: {
              points: true
            }
          }
        },
        where: {
          points: {
            some: {
              itinerary: {
                scheduleDate: {
                  gte: from.toDate().toISOString(),
                  lte: toDate.toDate().toISOString()
                }
              }
            }
          },
        },
        orderBy: {
          points: {
            _count: 'desc'
          }
        },
        take: 5
      }),
      prisma.client.findMany({
        select: {
          name: true,
          _count: {
            select: {
              points: true
            }
          }
        },
        where: {
          points: {
            some: {
              itinerary: {
                scheduleDate: {
                  gte: from.toDate().toISOString(),
                  lte: toDate.toDate().toISOString()
                }
              }
            }
          }
        },
        orderBy: {
          points: {
            _count: 'desc'
          }
        },
        take: 5
      }),
      prisma.point.count({
        where: {
          itinerary: {
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          },
          type: 'point-route'
        }
      }),
      prisma.point.count({
        where: {
          itinerary: {
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          },
          type: 'point-parcel'
        }
      }),
      prisma.point.count({
        where: {
          itinerary: {
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          },
          type: 'point-collect'
        }
      }),
      prisma.itinerary.groupBy({
        by: ['scheduleDate', 'id'],
        where: {
          scheduleDate: {
            gte: from.toDate().toISOString(),
            lte: toDate.toDate().toISOString()
          }
        },
        _count: true,
        orderBy: {
          scheduleDate: 'asc'
        }
      }),
      prisma.point.count({
        where: {
          itinerary: {
            scheduleDate: {
              gte: from.toDate().toISOString(),
              lte: toDate.toDate().toISOString()
            }
          },
          response: {
            isNot: null
          }
        }
      }),
      prisma.invoce.count({
        where: {
          point: {
            itinerary: {
              scheduleDate: {
                gte: from.toDate().toISOString(),
                lte: toDate.toDate().toISOString()
              }
            }
          }
        }
      })
    ]);

    const averagePointPerItinerary = ((totalPointsCount / totalItineraryCount)).toFixed(2) || 0;

    const topUsers = topFiveOperators.map(user => ({
      fullName: `${user.firstName} ${user.lastName}`,
      totalPoints: user._count.points
    }));

    const topClients = topFiveClients.map(client => ({
      name: client.name,
      totalPoints: client._count.points
    }));

    const itinerariesIds = groupedItineraries.map(i => i.id);

    const points = await prisma.point.groupBy({
      by: ['itineraryId'],
      where: {
        itineraryId: { in: itinerariesIds }
      },
      _count: {
        id: true
      }
    });

    const pointsByItinerary = Object.fromEntries(
      points.map((point) => [ point.itineraryId, point._count.id ])
    );

    const groupedResults = groupedItineraries.map(i => {
      let shouldGroupBy = from.daysDifferenceWith(toDate) < 30 ? 'day' : 'month';

      const month = i.scheduleDate.getMonth() + 1;
      const year = i.scheduleDate.getFullYear();

      const period = shouldGroupBy == 'day' ? i.scheduleDate.toLocaleDateString('es-MX')
        : `${year}-${month.toString().padStart(2, '0')}`;

        return {
          period,
          totalPoints: pointsByItinerary[i.id]
        }
    });

    const aggregatedPointsByDate = groupedResults.reduce<Record<string, number>>((acc, item) => {
      const { period, totalPoints } = item;

      if(!acc[period]) {
        acc[period] = 0;
      }

      acc[period] += totalPoints || 0;

      return acc;
    }, {});

    const averageInvoicePerPoint: string | number = ((invoiceCount / totalPointsCount)).toFixed(2) || 0;

    const averageErrorPointPerItinerary: string | number = ((totalPointProblemCount / totalPointsCount)).toFixed(2) || 0;

    return {
      totalItineraryCount,
      totalPointsCount,
      totalPointProblemCount,
      averagePointPerItinerary,
      topFiveOperators: topUsers,
      topFiveClients: topClients,
      routePointCount,
      parcelPointCount,
      collectPointCount,
      aggregatedPointsByDate,
      pointAnswerSurveyCount,
      invoiceCount,
      averageInvoicePerPoint,
      averageErrorPointPerItinerary
    }
  }

  async pointPerPersonGeneral(from: FromDate, to: ToDate): Promise<{ fullName: string; goodPoints: number; badPoints: number; totalPoints: number }[]> {
    const pointPerPerson = await prisma.user.findMany({
      where: {
        points: {
          some: {
            itinerary: {
              scheduleDate: {
                gte: from.toDate().toISOString(),
                lte: to.toDate().toISOString()
              }
            },
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        _count: {
          select: {
            points: {
              where: {
                itinerary: {
                  scheduleDate: {
                    gte: from.toDate().toISOString(),
                    lte: to.toDate().toISOString()
                  },
                  
                },
                problem: false,
              }
            }
          },
        },
        
        points: {
          select: {
            problem: true
          },
          where: {
            itinerary: {
              scheduleDate: {
                gte: from.toDate().toISOString(),
                lte: to.toDate().toISOString()
              }
            },
            problem: true
          },

        }
      },
    });

    const aggregatedPointsPerPerson = pointPerPerson.map(u => ({
      fullName: u.firstName + ' ' + u.lastName,
      goodPoints: u._count.points || 0,
      badPoints: u.points.length || 0,
      totalPoints: u._count.points + u.points.length
    }));
    
    return aggregatedPointsPerPerson
  }

  // analytics

  async attendanceGeneralReport(from: FromDate, to: ToDate): Promise<{
    fullName: string;
    job: string;
    absenceCount: number;
    delayCount: number;
  }[]> {
    const attendanceIssue = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            attendanceIssues: {
              where: {
                date: {
                  gte: from.toDate().toISOString(),
                  lte: to.toDate().toISOString()
                },
                OR: [
                  { isJustified: false },
                  { justification: { status: JustificationStatusEnum.pending } },
                  { justification: { status: JustificationStatusEnum.rejected } },
                ],
                type: AttendanceType.ABSENCE 
              }
            }
          }
        },
        firstName: true,
        lastName: true,
        job: true,
        attendanceIssues: {
          select: {
            id: true
          },
          where: {
            date: {
              gte: from.toDate().toISOString(),
              lte: to.toDate().toISOString()
            },
            OR: [
              { isJustified: false },
              { justification: { status: JustificationStatusEnum.pending } },
              { justification: { status: JustificationStatusEnum.rejected } },
            ],
            type: AttendanceType.DELAY
          } 
        }
      }
    });

    const table = attendanceIssue.map(a => ({
      fullName: a.firstName + ' ' + a.lastName,
      job: a.job,
      absenceCount: a._count.attendanceIssues,
      delayCount: a.attendanceIssues.length
    }))

    return table
  }

    async taskGeneralReport(from: FromDate, to: ToDate): Promise<{
      topTenMostTasks: {
        fullName: string,
        total: number
      }[],
      topTenLeastTasks: {
        fullName: string,
        total: number
      }[],
      topTenMostDueTasks: {
        fullName: string,
        total: number
      }[],
      asignedCount: number,
      inProgressCount: number,
      finishedCount: number,
      dueCount: number,
      topFivDepartmentsTasks: {
        fullName: string,
        total: number
      }[]
    }> {
      const taskMostPerUserDb = await prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          _count: {
            select: {
              tasks: {
                where: {
                  dueTo: {
                    gte: from.toDate().toISOString(),
                    lte: to.toDate().toISOString()
                  },
                  status: 'completed'
                }
              }
            }
          }
        },
        orderBy: {
          tasks: {
            _count: 'desc'
          }
        },
        take: 10
      });

      const taskLeastPerUserDb = await prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          _count: {
            select: {
              tasks: {
                where: {
                  dueTo: {
                    gte: from.toDate().toISOString(),
                    lte: to.toDate().toISOString()
                  },
                  status: 'completed'
                }
              }
            }
          }
        },
        orderBy: {
          tasks: {
            _count: 'asc'
          }
        },
        take: 10
      });

      const taskMostDuePerUserDb = await prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          _count: {
            select: {
              tasks: {
                where: {
                  dueTo: {
                    gte: from.toDate().toISOString(),
                    lte: to.toDate().toISOString()
                  },
                  status: 'pastdue'
                }
              }
            }
          }
        },
        orderBy: {
          tasks: {
            _count: 'desc'
          }
        },
        take: 10
      });

      

      const topTenMostTasks = taskMostPerUserDb.map(u => ({
        fullName: u.firstName + ' ' + u.lastName,
        total: u._count.tasks
      })).sort((a, b) => b.total - a.total);;

      const topTenLeastTasks = taskLeastPerUserDb.map(u => ({
        fullName: u.firstName + ' ' + u.lastName,
        total: u._count.tasks
      })).sort((a, b) => a.total - b.total);;

      const topTenMostDueTasks = taskMostDuePerUserDb.map(u => ({
        fullName: u.firstName + ' ' + u.lastName,
        total: u._count.tasks
      })).sort((a, b) => b.total - a.total);;

      const [
        asignedCount,
        inProgressCount,
        finishedCount,
        dueCount
      ] = await Promise.all([
        prisma.task.count({
          where: {
            status: 'assigned'
          }
        }),
        prisma.task.count({
          where: {
            status: 'in-progress'
          }
        }),
        prisma.task.count({
          where: {
            status: 'completed',
            dueTo: {
              gte: from.toDate().toISOString(),
              lte: to.toDate().toISOString()
            },
          }
        }),
        prisma.task.count({
          where: {
            status: 'pastdue',
            dueTo: {
              gte: from.toDate().toISOString(),
              lte: to.toDate().toISOString()
            },
          }
        }),
      ]);

      const taskMostPertDepartmentDb = await prisma.department.findMany({
        select: {
          name: true,
          _count: {
            select: {
              tasks: {
                where: {
                  dueTo: {
                    gte: from.toDate().toISOString(),
                    lte: to.toDate().toISOString()
                  },
                  status: 'completed'
                }
              }
            }
          }
        },
        orderBy: {
          tasks: {
            _count: 'desc'
          }
        },
        take: 5
      });

      const topFivDepartmentsTasks = taskMostPertDepartmentDb.map(u => ({
        fullName: u.name,
        total: u._count.tasks
      })).sort((a, b) => b.total - a.total); 

      return { 
        topTenLeastTasks,
        topTenMostTasks,
        topTenMostDueTasks,
        asignedCount,
        inProgressCount,
        finishedCount,
        dueCount,
        topFivDepartmentsTasks
       };
    }
}
