
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];

// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }
}

$(function () {
    loadBookData();
});

//新增書籍視窗
$(document).ready(function () {
    var myWindow = $("#window"),
        add_book = $("#add_book");

    add_book.click(function () {
        myWindow.data("kendoWindow").open();
        add_book.fadeOut();
    });

    function onClose() {
        add_book.fadeIn();
    }

    myWindow.kendoWindow({
        width: "600px",
        title: "新增書籍",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center();


    $("#grid").kendoGrid({
        dataSource: {
            data: bookData,
            schema: {
                model: {
                    fields: {
                        BookId: { type: "number" },
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "date" },
                        BookDeliveredDate: { type: "date" },
                        BookPrice: { type: "number" },
                        BookAmount: { type: "number" },
                        BookTotal: { type: "number" },
                    }
                }
            },
            pageSize: 20
        },
        height: 700,
        scrollable: true,
        sortable: true,
        toolbar: kendo.template($("#search").html()),
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            {
                command: "destroy",
                title: "&nbsp;",
                width: 120,
            },
            {
                field: "BookId",
                title: "書籍編號",
                width: 90,
            },
            {
                field: "BookName",
                title: "書籍名稱",
                width: 120,
            },
            {
                field: "BookCategory",
                title: "書籍種類",
                values: bookCategoryList,
                width: 110,
            },
            {
                field: "BookAuthor",
                title: "作者",
                width: 120,
            },
            {
                field: "BookBoughtDate",
                title: "購買日期",
                format: "{0:yyyy-MM-dd}",
                width: 140,
            },
            {
                field: "BookDeliveredDate",
                title: "送達狀態",
                template: function (item) {
                    if (item.BookDeliveredDate != undefined) {
                        return "<i class=\"fas fa-truck\"></i>";
                    } else {
                        return "";
                    }
                },
                width: 150,
            },
            {
                field: "BookPrice",
                title: "金額",
                format: "{0:n0}",
                width: 100,
            },
            {
                field: "BookAmount",
                title: "數量",
                width: 80,
            },
            {
                field: "BookTotal",
                title: "總計",
                format: "{0:n0}元",
                width: 150,
            },
        ]
    });

    //刪除書籍視窗
    $("#delete_book_window").kendoWindow({
        width: "600px",
        title: "刪除書籍",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    }).data("kendoWindow").center();

    $("#bought_datepicker").kendoDatePicker();
    $("#delivered_datepicker").kendoDatePicker();

});

