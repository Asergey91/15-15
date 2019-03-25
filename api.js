faker.locale = "ru";
var DummyApi={
    guideList:[
        'Оля',
        'Юля',
        'Даша',
        'Вера',
        'Сергей',
        'Ирина'
    ],
    companyList:[
        '15-15 саит',
        'Tripster',
        'Sputnik8',
        'Блогер-Партнер',
        'Weatlas',
        'Натали Турс',
        'Tezeks',
        'Без записи'
    ],
    last7Days() {
        var result = [];
        for (var i=0; i<7; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( parseDate(d) )
        }
    
        return result;
    },
    last12Months() {
        var months=[
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];
        var result = [];
        for (var i=0; i<13; i++) {
            var d = new Date();
            d.setDate(1);
            d.setMonth(d.getMonth()-i);
            //var y = d.getFullYear();
            result.push([d.getFullYear()+' '+months[d.getMonth()],d.getMonth()+1 ,d.getFullYear()]);
        }
    
        return result;
    },
    getDataByMonth: function(month, year){
        month=month-1;
        inputFromApi=[];

        var thisMonth=new Date(year, month, 1);
        var nextMonth=new Date(thisMonth);
        nextMonth.setMonth(nextMonth.getMonth()+1);

        var countLoops1=getRandomInt(30);
        for (let i = 0; i < countLoops1; i++) {
            //faker.seed(getRandomInt(999));
            inputFromApi[i]={
                id: i,
                Дата: faker.date.between(thisMonth, nextMonth),
                Экскурсовод: this.guideList[Math.floor(Math.random() * Math.floor(this.guideList.length))],
                Фото: 'img/peopleSample.jpg',
                Туристы: []
            };
            var countLoops2=getRandomInt(8);
            for (let j = 0; j < countLoops2; j++){
                var numTour=getRandomInt(3);

                inputFromApi[i].Туристы[j]={
                    id: j,
                    Количество: numTour,
                    Фото: Math.random()<0.2?'img/docsSample.jpg':'',
                    Откуда: this.companyList[Math.floor(Math.random() * Math.floor(this.companyList.length))],
                    Нал: getRandomInt(numTour)*20,
                    ДопИнформация: faker.lorem.sentences(getRandomInt(10))
                };
            } 
        }
        return inputFromApi;
    }
}