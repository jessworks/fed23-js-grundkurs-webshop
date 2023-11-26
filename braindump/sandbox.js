/*
_____________________
ARITHMETICS & TIMERS
_____________________

if och definiera tidsram med hjälp av dagar och klockslag
! kom ihåg parenteserna, det är matte
ex mimmi o musse pigg

! koppla den till det specifika elementet
    -må 03-10 -10% på order form sumTotal
        -if... dag && (större än 03 || mindre än 10) {order sumTotal * 0.9;
        påa rabatten --> skapa element separat och anropa här för cleaner if}
        -printa på nytt, anropa i vad?
    -fr 15- må 03 +15% på price
        -if... (större än dag och tid) || mindre än dag och  tid) {prishöjning på produktsida price * 1.15}
        -printa price på nytt, anropa i produktloop?
    -10+ samma produkt -10%
        -if... produktinputrutan? > 10...{rabatt på enskilda produktens totalsumma * 0.9}
        -printa produktens totalsumma på nytt, anropa i produktloop?
    -16+ products fri lev.
        -if... productsTotal > 16... {disable deliveryCost-beräkningen}
        -anropa i deliveryCost-beräkningen?
    -lev 
        -( 25 + totalPriceProducts * 1.1
    -faktura disabled
        -totalPriceProducts > 800
            -disable faktura alternativet --> hur?
        -på att det inte går där faktura alternativet finns

    -15 min  timeout
        -koppla till produktsida och order form, bordew återställa allt. men filter då?

*/
