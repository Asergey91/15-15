function parseDate(date){
    var today = date;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Су'];
    var day = today.getDay();
    var yyyy = today.getFullYear();
    
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var string = dd + '(' + days[day] + '.)';
    return string;
}
function parseDateEU(date){
    var dd=date.getDate();
    var mm=date.getMonth()+1;
    var yyyy=date.getFullYear();
    var day=date.getDay();
    var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Су'];
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    var result=dd+'/'+mm+'/'+yyyy+' ('+days[day]+')';
    return result;

}
function getRandomInt(max) {
    var temp=Math.floor(Math.random() * Math.floor(max));
    return temp+1;
}
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days;
}


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={screen: 'Records'};
        this.changeScreenToRecords=this.changeScreenToRecords.bind(this);
        this.changeScreenToAdd=this.changeScreenToAdd.bind(this);
        this.changeScreenToConfirm=this.changeScreenToConfirm.bind(this);
        this.changeScreenToView=this.changeScreenToView.bind(this);
        this.updateRecords=this.updateRecords.bind(this);
    }
    selectedMonth=this.props.selectedMonth;
    selectedYear=this.props.selectedYear;
    
    changeScreenToRecords(){
        this.setState({screen: "Records"});
    }
    changeScreenToConfirm(){
        this.setState({screen: "Confirm"});
    }
    changeScreenToAdd(){
        this.setState({screen: "Add"});
    }
    changeScreenToView(viewData){
        this.setState({screen: "View"});
        this.viewData=viewData;
    }
    updateRecords(input){
        input=JSON.parse(input);
        console.log(input);
        this.selectedMonth=input.month;
        this.selectedYear=input.year;
        this.setState({screen: "Records"});
    }
    
    render(){
        var records=DummyApi.getDataByMonth(this.selectedMonth, this.selectedYear);
        if (this.state.screen=='Records'){
            return (
                <div>
                    <Menu 
                    records={records}
                    selectedMonth={this.selectedMonth} 
                    selectedYear={this.selectedYear}
                    updateRecords={this.updateRecords}
                    changeScreenToAdd={this.changeScreenToAdd}
                    />
                    <Records 
                    records={records}
                    changeScreenToView={this.changeScreenToView}
                    changeScreenToConfirm={this.changeScreenToConfirm}/>
                </div>
            );
        }
        else if(this.state.screen=='Confirm'){
            return (
                <div>
                    <Confirm message='Вы уверены?' changeScreenToRecords={this.changeScreenToRecords}/>
                </div>
            );
        }
        else if(this.state.screen=='Add'){
            return (
                <div>
                    <Add changeScreenToRecords={this.changeScreenToRecords}/>
                </div>
            );
        }
        else if(this.state.screen=='View'){
            return (
                <div>
                    <View changeScreenToRecords={this.changeScreenToRecords} viewData={this.viewData}/>
                </div>
            );
        }
    }
}
class View extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var tourists=0;
        var money=0;
        var sub=[];
        for(let j=0; j<this.props.viewData.Туристы.length; j++){
            money=money+this.props.viewData.Туристы[j].Нал;
            tourists=tourists+this.props.viewData.Туристы[j].Количество;
            
            
            if(this.props.viewData.Туристы[j].Фото!=''){
                var photo=(
                <div className='four columns' style={{textAlign:'center'}}>
                    <a href={this.props.viewData.Туристы[j].Фото} target="_blank" rel="noopener noreferrer" >
                    <img className='u-max-full-width' height='200px'src={this.props.viewData.Туристы[j].Фото}/>
                    </a>
                </div>);
            }
            else{
                var photo=(
                <div className='four columns' style={{textAlign:'center'}}>
                    
                    <img className='u-max-full-width' height='200px'src='img/noPhoto2.png'/>
                    
                </div>);
            }
            sub[j]=(
                <div key={j} style={{'padding':'20px 20px 10px 20px', 'borderBottom': '1px dotted black'}}>
                    <div className="row" >
                        <div className='eight columns' style={{textAlign:'left'}}>
                            <h6><b>{this.props.viewData.Туристы[j].Количество}</b> Тур., 
                            От <b>{this.props.viewData.Туристы[j].Откуда}</b>,
                            Оплатили Наличными: <b>{this.props.viewData.Туристы[j].Нал} €</b>
                            <br/><br/>
                            <b>Доп. Инфо:</b>
                            <div style={{padding:'10px', color: '#888888'}}>
                                {this.props.viewData.Туристы[j].ДопИнформация}
                            </div>
                            </h6>
                            <h5>
                                
                            </h5>
                        </div>
                        {photo}
                        
                    </div>
                </div>
            );
        }
        return(
            <div className='container'>
                <div className='row'>
                    <div className='twelve columns' style={{textAlign:'center'}}>
                        <br/>
                        
                        <h3><b style={{color:'green'}}>{this.props.viewData.Экскурсовод}</b> {parseDateEU(this.props.viewData.Дата)}</h3>
                        <h4><b style={{color:'blue'}}>{tourists}</b> Туристов <b style={{color:'red'}}>{money} €</b> Наличными</h4>
                        <button className='button-primary' onClick={this.props.changeScreenToRecords}>Закрыть</button>
                    </div>
                </div>
                {sub}
                <div class='row'>
                    <div className='twelve columns'>
                        <img className='u-full-width' src={this.props.viewData.Фото}>
                        
                        </img>
                    </div>
                </div>
            </div>
        );
    }
}
class Add extends React.Component{
    constructor(props){
        super(props);
        this.addTour=this.addTour.bind(this);
        this.removeTour=this.removeTour.bind(this);
        this.state={numTour:0}
    }
    removeTour(){
        this.setState({numTour: this.state.numTour-1});
    }
    addTour(){
        this.setState({numTour: this.state.numTour+1});
    }
    render(){
        var guides=[];
        for (let i = 0; i < DummyApi.guideList.length; i++) {
            guides[i]=(
                <option key={i} value={i}>{DummyApi.guideList[i]}</option>
            );
            
        }
        var dates=[];
        var last7Days=DummyApi.last7Days();
        for (let i = 0; i < last7Days.length; i++) {
            dates[i]=(
                <option key={i} value={i}>{last7Days[i]}</option>
            );
        }

        var tours=[];
        for(let i=0; i<this.state.numTour; i++){
            tours[i]=<Tour key={i} listKey={i} removeTour={this.removeTour}/>;
        }

        var corp=[];
        for (let i = 0; i < DummyApi.companyList.length; i++) {
            
            corp[i]=(
                
                <option key={i} value={i}>{DummyApi.companyList[i]}</option>
            );
            
        }

        return(
            <div className='container'>
                <br/>
                <br/>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="date">Дата</label>
                        <select className="u-full-width" id="date">
                            {dates}
                        </select>
                    </div>

                    <div className="six columns">
                        <label htmlFor="guides">Экскурсовод</label>
                        <select className="u-full-width" id="guides">
                            {guides}
                        </select>
                    </div>
                </div>


                <div style={{'backgroundColor': '#dddddd', 'padding':'5px 20px 10px 20px', 'borderBottom': '1px dotted black'}}>
                    <div className="row" >
                        
                        <div className="four columns">
                            <label htmlFor="num">Количество Тур.</label>
                            <input type='number' id='num' className='u-full-width'/>
                        </div>

                        <div className="four columns">
                            <label htmlFor="cash">Наличных</label>
                            <input id='cash' type='number' className='u-full-width'/>
                        </div>
                        <div className="four columns">
                            <label htmlFor="source">Источник</label>
                            <select className="u-full-width" id="source">
                                {corp}
                            </select>
                        </div>
                    </div>
                    <div className="row" >
                        
                        <div className="eight columns">
                            <label htmlFor="notes">Доп. информация</label>
                            <input type='text' id='notes' className='u-full-width'/>
                        </div>

                        <div className="four columns">
                            <button className='u-full-width button-primary' style={{marginTop:'30px'}}>Фото Подтверждения</button>
                            
                        </div>
                    </div>
                </div>
                

                {tours}


                <div className="row" style={{'marginTop': '20px'}}>
                    
                    <div className='six columns'>
                        <button className='u-full-width' onClick={this.addTour}>Добавить Тур.</button>
                    </div>
                    <div className='six columns'>
                        <button className='u-full-width button-primary'>Фото Группы</button>
                    </div>
                </div>
                <div className="row" >
                    
                    <div className='twelve columns'>
                        <button className='u-full-width' onClick={this.props.changeScreenToRecords}>Cохранить</button>
                    </div>
                </div>
                <div className="row" >
                    
                    <div className='twelve columns'>
                        <button className='u-full-width button-primary' onClick={this.props.changeScreenToRecords}>Отмена</button>
                    </div>
                </div>
                
            </div>
        );
    }

}
class Tour extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var corp=[];
        for (let i = 0; i < DummyApi.companyList.length; i++) {
            
            corp[i]=(
                
                <option key={i} value={i}>{DummyApi.companyList[i]}</option>
            );
            
        }
        return(
            <div style={{'backgroundColor': '#dddddd', 'padding':'5px 20px 10px 20px', 'borderBottom': '1px dotted black'}}>
            <div className="row" >
                
                <div className="four columns">
                    <label htmlFor="num">Количество Тур.</label>
                    <input type='number' id='num' className='u-full-width'/>
                </div>

                <div className="four columns">
                    <label htmlFor="cash">Наличных</label>
                    <input id='cash' type='number' className='u-full-width'/>
                </div>
                <div className="four columns">
                    <label htmlFor="source">Источник</label>
                    <select className="u-full-width" id="source">
                        {corp}
                    </select>
                </div>
            </div>
            <div className="row" >
                
                <div className="eight columns">
                    <label htmlFor="notes">Доп. информация</label>
                    <input type='text' id='notes' className='u-full-width'/>
                </div>

                <div className="four columns">
                    <button className='u-full-width button-primary' onClick={this.props.removeTour}>Фото Подтверждения</button>
                    <button className='u-full-width' onClick={this.props.removeTour}>Удалить</button>
                    
                </div>
            </div>
            </div>
        );
    }
    
}
class Confirm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3>{this.props.message}</h3>
                <br/>
                <button style={{'marginRight': '20px'}} onClick={this.props.changeScreenToRecords}>ДА</button>
                <button className='button-primary' onClick={this.props.changeScreenToRecords}>НЕТ</button>
            </div>
        );
    }
} 
class Menu extends React.Component{
    constructor(props){
        super(props);
        this.changeMonth = this.changeMonth.bind(this);
        this.renderCSV = this.renderCSV.bind(this);
    }
    changeMonth(event){
        this.props.updateRecords(event.target.value);
        
        
    }
    renderCSV(){
        var data=this.props.records;
        var table1=[];
        table1[0]=[];
        table1[0]=['Дата'].concat(DummyApi.companyList);
        
        data.sort(sortFunction);

        function sortFunction(a, b) {
            if (a.Дата === b.Дата) {
                return 0;
            }
            else {
                return (a.Дата < b.Дата) ? -1 : 1;
            }
        }
        var numComps=DummyApi.companyList.length;
        var numDays=getDaysInMonth(new Date().getMonth(), new Date().getFullYear()).length;
        
        console.log(data)
        
        for(let i=0; i<numDays; i++){

            table1[i+1]=[];//row
            table1[i+1][0]=i+1;
            
            for (let j = 0; j < numComps; j++) {
                table1[i+1][j+1]=0;//cell
                for(let k=0; k<data.length; k++){//iterate data
                    if(data[k].Дата.getDate()==table1[i+1][0]){//check if date matches to table
                        for (let l = 0; l < data[k].Туристы.length; l++) {//iterate tourists
                            if(data[k].Туристы[l].Откуда==table1[0][j+1]){//compare heading
                                table1[i+1][j+1]=table1[i+1][j+1]+data[k].Туристы[l].Количество;
                            }
                        }
                    }
                }
            }
            
        }
        
        console.log(table1);









        const rows = table1;
        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function(rowArray){
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        link.click();

    }
    render(){
        var months=DummyApi.last12Months();

        for (let i = 0; i < months.length; i++) {
            if(months[i][1]==this.selectedMonth && months[i][2]==this.selectedYear){
                months[i]=(
                <option key={i} value={JSON.stringify({month: months[i][1], year: months[i][2]})} selected="selected">
                    {months[i][0]}
                </option>
                );
            }
            else{
                months[i]=(
                    <option key={i}  value={JSON.stringify({month: months[i][1], year: months[i][2]})}>
                        {months[i][0]}
                    </option>
                );
            }
        }

        return(
            <div className="container" style={{'marginTop':'20px', 'marginBottom':'20px'}}>
                <div className="row" >
                    <div className="twelve columns">
                        <select onChange={this.changeMonth} className="u-full-width" id="months">
                            {months}
                        </select>
                    </div>
                </div>
                <div className="row" style={{'borderBottom': '1px solid black'}}>
                    <div className="six columns">
                        <button className='button-primary u-full-width' onClick={this.props.changeScreenToAdd}>Написать Отчет</button>
                    </div>
                    <div className="six columns">
                        <button className="u-full-width" onClick={this.renderCSV}>Экспорт</button>
                    </div>
                </div>
            </div>
        );
    }
}
class Records extends React.Component{
    constructor(props){
        super(props);
        this.sortByDate=this.sortByDate.bind(this);
    }
    sortByDate(){
       
        
        this.props.records.sort(sortFunction);

        function sortFunction(a, b) {
            if (a.Дата === b.Дата) {
                return 0;
            }
            else {
                return (a.Дата > b.Дата) ? -1 : 1;
            }
        }
    }

    render(){
        
        this.sortByDate();

        var records=[];
        
        for(let i=0; i<this.props.records.length; i++){
            var tourists=0;
            var money=0;
            for(let j=0; j<this.props.records[i].Туристы.length; j++){
                money=money+this.props.records[i].Туристы[j].Нал;
                tourists=tourists+this.props.records[i].Туристы[j].Количество;
            }
            
            records[i]=(
                <Record
                fullRecord={this.props.records[i]}
                key={i} 
                changeScreenToView={this.props.changeScreenToView}
                changeScreenToConfirm={this.props.changeScreenToConfirm} 
                Дата={parseDate(this.props.records[i].Дата)} 
                Экскурсовод={this.props.records[i].Экскурсовод} 
                Количество={tourists} 
                Нал={money}/>
            );
        }
       
        return (
            <div className='container'>
                {records}
            </div>
        );
            
    }
}
class Record extends React.Component{
    constructor(props){
        super(props)
        this.changeScreenToView=this.changeScreenToView.bind(this);
    }
    changeScreenToView(){
        this.props.changeScreenToView(this.props.fullRecord);
    }
    render(){
        return(
            <div className="row" style={{'borderBottom': '1px dotted black', 'marginTop':'20px'}}>
                <div className="six columns" style={{'marginTop': '8px', 'marginBottom':'8px'}}>
                    <b>{this.props.Дата}</b> {this.props.Экскурсовод} <b>{this.props.Количество}Чел.</b><span className="u-pull-right">{this.props.Нал} €</span>
                </div>
                <div className="six columns">
                    <button className='button-primary' onClick={this.changeScreenToView}>Доп. Инфо.</button><span className="u-pull-right"><button onClick={this.props.changeScreenToConfirm}>Удалить</button></span>
                </div>
            </div>
            
        );
    }
}
ReactDOM.render(<App selectedMonth={new Date().getMonth()+1} selectedYear={new Date().getFullYear()}/>, document.getElementById('app'));