const date = new Date();
const today = date.getDate();
const currentMonth = date.getMonth();
const nowYear = date.getFullYear();

let displayYear = nowYear;
let displayMonth = currentMonth;

// 指定日のやる気レベルを取得（複数ある場合は最大値）
function getMotivation(year, month, day) {
    const targetDate =
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const logs = studyLogs.filter(log => log[0] && log[0].startsWith(targetDate));
    if (logs.length === 0) return null;
    return Math.max(...logs.map(log => parseInt(log[1])));
}

// 指定日の学習ログを取得
function getStudyLogs(year, month, day) {
    const targetDate =
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return studyLogs.filter(log => log[0] && log[0].startsWith(targetDate));
}

// モーダルに指定日の詳細を表示
function showDayModal(year, month, day) {

    const events = getEvents(year, month, day);
    const logs = getStudyLogs(year, month, day);
    const statusEmojis = ["😫", "☹️", "😐", "🙂", "😊"];

    document.getElementById("modal-title").textContent =
        `${month + 1}月${day}日`;

    let bodyHTML = "";

    if (logs.length > 0) {
        bodyHTML += `<div class="modal-section"><h3>学習記録</h3>`;
        logs.forEach(log => {
            const timeStr = log[0] ? log[0].substring(11, 16) : "";
            const emoji = statusEmojis[parseInt(log[1]) - 1] || "";
            bodyHTML += `
                <div class="modal-item">
                    <span class="modal-time">${timeStr}</span>
                    <span>${log[2]}分</span>
                    <span>${emoji}</span>
                </div>`;
        });
        bodyHTML += `</div>`;
    }

    if (events.length > 0) {
        bodyHTML += `<div class="modal-section"><h3>予定・タスク</h3>`;
        events.forEach(event => {
            const typeLabel = event[0] === "schedule" ? "予定" : "タスク";
            const timeStr = event[2] ? event[2].substring(11, 16) : "";
            const memo = event[3] || "";
            bodyHTML += `
                <div class="modal-item">
                    <div class="modal-item-header">
                        <span class="modal-type-badge ${event[0]}">${typeLabel}</span>
                        <span class="modal-time">${timeStr}</span>
                        <span class="modal-item-title">${event[1]}</span>
                    </div>
                    ${memo ? `<div class="modal-memo">${memo}</div>` : ""}
                </div>`;
        });
        bodyHTML += `</div>`;
    }

    if (bodyHTML === "") {
        bodyHTML = `<p class="modal-empty">この日の記録はありません</p>`;
    }

    document.getElementById("modal-body").innerHTML = bodyHTML;
    document.getElementById("day-modal").classList.add("active");
}

// 指定日の予定を取得
function getEvents(year, month, day) {

    const targetDate =
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return schedules.filter(item =>
        item[2] && item[2].startsWith(targetDate)
    );
}

function createCalendar(year, month) {

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
        new Date(year, month + 1, 0).getDate();

    const firstDay =
        new Date(year, month, 1).getDay();

    const daysInPrevMonth =
        new Date(year, month, 0).getDate();

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
                    getEvents(year, month, dayCount);

                const motivation =
                    getMotivation(year, month, dayCount);

                let classes = [];
                if (j === 0) classes.push("sun");
                else if (j === 6) classes.push("sat");

                if (dayCount === today &&
                    month === currentMonth &&
                    year === nowYear) {
                    classes.push("today");
                }

                if (motivation) {
                    classes.push(`motivation-${motivation}`);
                }

                const classAttr = classes.length
                    ? ` class="${classes.join(" ")}"` : "";

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

                calendarHTML += `
                    <td${classAttr} data-year="${year}" data-month="${month}" data-day="${dayCount}">
                        <div class="day-number">${dayCount}</div>
                        ${eventHTML}
                    </td>
                `;

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

// カレンダーをナビゲーションごと描画
function renderCalendar() {

    const monthNames = [
        "1月","2月","3月","4月","5月","6月",
        "7月","8月","9月","10月","11月","12月"
    ];

    let html = `
        <div class="calendar-nav">
            <button class="calendar-nav-btn" id="prev-month">&#8249;</button>
            <span class="calendar-nav-title">${displayYear}年 ${monthNames[displayMonth]}</span>
            <button class="calendar-nav-btn" id="next-month">&#8250;</button>
        </div>
    `;
    html += createCalendar(displayYear, displayMonth);

    document.getElementById("calendar").innerHTML = html;

    document.getElementById("prev-month").addEventListener("click", function() {
        displayMonth--;
        if (displayMonth < 0) { displayMonth = 11; displayYear--; }
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", function() {
        displayMonth++;
        if (displayMonth > 11) { displayMonth = 0; displayYear++; }
        renderCalendar();
    });
}

// カレンダー表示
renderCalendar();

// 日付クリックでモーダル表示（イベント委任）
document.getElementById("calendar").addEventListener("click", function(e) {
    if (e.target.closest(".calendar-nav-btn")) return;
    const td = e.target.closest("td[data-day]");
    if (!td) return;
    showDayModal(
        parseInt(td.dataset.year),
        parseInt(td.dataset.month),
        parseInt(td.dataset.day)
    );
});
