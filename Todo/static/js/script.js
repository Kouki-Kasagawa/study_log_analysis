const date = new Date();          // 今日の日付
const today = date.getDate();     // 今日の日
const currentMonth = date.getMonth(); // 今月（0～11）
const nowYear = date.getFullYear();   // 今年

// 指定日の予定を取得
function getEvents(year, month, day) {

    const targetDate =
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return schedules.filter(item =>
        item[2] && item[2].startsWith(targetDate)
    );
}

function createCalendar(month) {

    const monthDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let calendarHTML = "";

    calendarHTML += `<table class="calendar">`;
    calendarHTML += `<thead><tr>`;

    // 曜日表示
    for (let i = 0; i < 7; i++) {

        if (i === 0) {
            calendarHTML += `<th class="sun">${monthDays[i]}</th>`;
        }
        else if (i === 6) {
            calendarHTML += `<th class="sat">${monthDays[i]}</th>`;
        }
        else {
            calendarHTML += `<th>${monthDays[i]}</th>`;
        }
    }

    calendarHTML += `</tr></thead><tbody>`;

    // 月の日数など
    const daysInMonth =
        new Date(nowYear, month + 1, 0).getDate();

    const firstDay =
        new Date(nowYear, month, 1).getDay();

    const daysInPrevMonth =
        new Date(nowYear, month, 0).getDate();

    let dayCount = 1;
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    // 最大6週
    for (let i = 0; i < 6; i++) {

        calendarHTML += `<tr>`;

        for (let j = 0; j < 7; j++) {

            // 前月の日付
            if (i === 0 && j < firstDay) {

                calendarHTML +=
                    `<td class="mute">${prevDayCount}</td>`;

                prevDayCount++;
            }

            // 翌月の日付
            else if (dayCount > daysInMonth) {

                let nextMonthDayCount =
                    dayCount - daysInMonth;

                calendarHTML +=
                    `<td class="mute">${nextMonthDayCount}</td>`;

                dayCount++;
            }

            // 当月の日付
            else {

                const events =
                    getEvents(nowYear, month, dayCount);

                let eventHTML = "";

                events.forEach(event => {

                    const type = event[0];
                    const title = event[1];

                    if (type === "schedule") {

                        eventHTML +=
                            `<div class="schedule">${title}</div>`;
                    }
                    else {

                        eventHTML +=
                            `<div class="task">${title}</div>`;
                    }
                });

                // 今日
                if (dayCount === today &&
                    month === currentMonth) {

                    calendarHTML += `
                        <td class="today">
                            <div class="day-number">${dayCount}</div>
                            ${eventHTML}
                        </td>
                    `;
                }

                // それ以外
                else {

                    calendarHTML += `
                        <td>
                            <div class="day-number">${dayCount}</div>
                            ${eventHTML}
                        </td>
                    `;
                }

                dayCount++;
            }
        }

        calendarHTML += `</tr>`;

        if (dayCount - daysInMonth > 7) {
            break;
        }
    }

    calendarHTML += `</tbody></table>`;

    return calendarHTML;
}

// カレンダー表示
document.getElementById("calendar").innerHTML =
    createCalendar(currentMonth);