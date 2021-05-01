import { Large } from '~/types/SupportedImageSizes/Large'
import { MaxImageSize } from '~/types/SupportedImageSizes/MaxImageSize'
import { Medium } from '~/types/SupportedImageSizes/Medium'
import { Thumbnail } from '~/types/SupportedImageSizes/Thumbnail'
import { ThumbnailSquare } from '~/types/SupportedImageSizes/ThumbnailSquare'

export type SupportedImageSizes = Large & MaxImageSize & Medium & Thumbnail & ThumbnailSquare;
