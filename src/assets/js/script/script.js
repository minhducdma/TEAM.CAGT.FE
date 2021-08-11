var R = {
    Init: function(){
        R.InitalLibrary();
        R.RegisterEvent();
    },
    RegisterEvent: function (){
        $('#dich-vu').off('change').on('change',function(){
            var selected_option = $('#dich-vu option:selected');
            if(selected_option.length > 0){
                $('#dich-vu-modal').modal('show');

            }
        })
        // thay đổi class active vào ul li
        $('.item-list').off('click').on('click',function(){
           $(".item li").find(".active").removeClass('active');
           $(this).addClass('active');
           
        })
        // thay đổi class active ở trong bảng
        $(".table tr").off('click').on('click',function(){

            $(this).closest("tbody").find(".active").removeClass('active');
            $(this).addClass('active');

            var $x = $(this).find('td');
            
        })
        // lấy ra giá trị rồi nhập vào ô input tương ứng
        $('#luu').off('click').on('click',function(){
            $('#dich-vu-modal').modal('hide');
            var $x = $('table tbody').find(".active");
            var $y = $x.find('td');
            var a =[];
            $y.each(function (b){
                a.push($(this).text());
            })
            $.each(a, function (index, value){
                $("input.name").val(a[0]);
                var z = a[2].split(':')[1];
                $("input.price").val(z);
            })
        })
        // tính tổng tiền
        $('.quantity').off('change').on('change',function(){
            var quantity = parseFloat($('input.quantity').val());
            var price = parseFloat($('input.price').val());
            var total = quantity * price;
            $('input.total').val(total);
        })

        $('.checkbox').off('click').on('click',function(){
            var check = $(this).find('.checked');
            if(check.length > 0){
                $(this).find('span').removeClass('checked');
            }else{
                $(this).find('span').addClass('checked');
            }
        })
    },
    InitalLibrary: function (){
    //    alert("sss");
    //     $("#select-f").select2({
    //         maximumSelectionLength: 1
    //     });
    }
}
R.Init();