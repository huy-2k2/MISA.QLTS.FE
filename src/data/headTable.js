import resource from "./resource"
import $enum from './enum'
const headTable = {
    // tiêu đề bảng của table chứng từ
     headLicenseTable : [
        {
            data: resource.tHead[10],
            type: $enum.dataType.string,
            isPrimary: true,
            width: '150px'
        },
        {
            data: resource.tHead[11],
            type: $enum.dataType.dateTime,
            width: '150px'
        },
        {
            data: resource.tHead[12],
            type: $enum.dataType.dateTime,
            width: '150px'
        },
        {
            data: resource.tHead[13],
            type: $enum.dataType.double,
            width: '220px'
        },
        {
            data: resource.tHead[14],
            type: $enum.dataType.string
        },
    ],
    
    // tiêu đề bảng của table chọn tài sản
     headFixedAssetOfLicenseTable : [
        {
            data: resource.tHead[1],
            type: $enum.dataType.string,
            width: '150px'
        },
        {
            data: resource.tHead[2],
            type: $enum.dataType.string,
            width: '400px'
        },
        {
            data: resource.tHead[4],
            type: $enum.dataType.string,
        },
        {
            data: resource.tHead[6],
            type: $enum.dataType.double,
            width: '180px'
        },
        {
            data: resource.tHead[15],
            type: $enum.dataType.double,
            width: '180px'
        },
        {
            data: resource.tHead[8],
            type: $enum.dataType.double,
            width: '180px'
        },
    ],

    // tiêu đề bảng của table tài sản
    headFixedAssetTable:  [
        {
            data: resource.tHead[1],
            type: $enum.dataType.string
        },
        {
            data: resource.tHead[2],
            type: $enum.dataType.string
        },
        {
            data: resource.tHead[3],
            type: $enum.dataType.string
        },
        {
            data: resource.tHead[4],
            type: $enum.dataType.string
        },
        {
            data: resource.tHead[5],
            type: $enum.dataType.interger
        },
        {
            data: resource.tHead[6],
            type: $enum.dataType.double
        },
        {
            data: resource.tHead[7].text,
            type: $enum.dataType.double,
            tooltip: resource.tHead[7].tooltip
        },
        {
            data: resource.tHead[8],
            type: $enum.dataType.double
        },
    ]
}

export default headTable