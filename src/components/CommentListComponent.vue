<template>
    <ul class="comment-list">
        <li class="comment-item">
            <img src="/static/user/avater/落落清欢.jpg" class="comment-avater"/>
            <div class="comment-detail">
                <div class="comment-username">吴时吴刻</div>
                <div class="comment-content">
                    very good!!!
                </div>
                <div class="comment-time">
                    <span>2021-08-21</span>
                    <span class="reply-btn">回复</span>
                </div>
                <ul class="reply-wrapper">
                    <li class="reply-item">
                        <img class="small-avater" src="https://p3.pstatp.com/img/mosaic-legacy/fef300001cb25f578408~0x0.jpg"/>
                        <div class="reply-detail">
                            <div class="reply-username">
                                <span>吴时吴刻</span>
                                <i class="iconfont iconfont-arrow"></i>
                                <span>吴怨无悔</span>
                            </div>
                            <div class="reply-content">
                                thank you
                            </div>
                        </div>
                    </li>
                    <li class="reply-item">
                        <img class="small-avater" src="https://p3.pstatp.com/img/mosaic-legacy/fef300001cb25f578408~0x0.jpg"/>
                        <div class="reply-detail">
                            <div class="reply-username">
                                <span>吴时吴刻</span>
                                <i class="iconfont iconfont-arrow"></i>
                                <span>吴怨无悔</span>
                            </div>
                            <div class="reply-content">
                                thank you
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
        <li class="comment-item">
            <img src="/static/user/avater/落落清欢.jpg" class="comment-avater"/>
            <div class="comment-detail">
                <div class="comment-username">吴时吴刻</div>
                <div class="comment-content">
                    very good!!!
                </div>
                <div class="comment-time">
                    <span>2021-08-21</span>
                    <span class="reply-btn">回复</span>
                </div>
            </div>
        </li>
        <li class="comment-item">
            <img src="/static/user/avater/落落清欢.jpg" class="comment-avater"/>
            <div class="comment-detail">
                <div class="comment-username">吴时吴刻</div>
                <div class="comment-content">
                    very good!!!
                </div>
                <div class="comment-time">
                    <span>2021-08-21</span>
                    <span class="reply-btn">回复</span>
                </div>
            </div>
        </li>
        <li class="comment-item">
            <img src="/static/user/avater/落落清欢.jpg" class="comment-avater"/>
            <div class="comment-detail">
                <div class="comment-username">吴时吴刻</div>
                <div class="comment-content">
                    very good!!!
                </div>
                <div class="comment-time">
                    <span>2021-08-21</span>
                    <span class="reply-btn">回复</span>
                </div>
            </div>
        </li>
        <li class="comment-item">
            <img src="/static/user/avater/落落清欢.jpg" class="comment-avater"/>
            <div class="comment-detail">
                <div class="comment-username">吴时吴刻</div>
                <div class="comment-content">
                    very good!!!
                </div>
                <div class="comment-time">
                    <span>2021-08-21</span>
                    <span class="reply-btn">回复</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
    export default {
        name: 'CommentListComponent'
    }
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .comment-list{
        padding: @big-margin;
        .comment-item{
            display: flex;
            padding-top: @big-margin;
            &:first-child{
                padding-top: 0;
            }
            .comment-avater{
                width: @middle-avater-size;
                height: @middle-avater-size;
                border-radius: @circle-avater;
            }
            .comment-detail{
                flex: 1;
                padding-left: @big-margin;
                .comment-username{
                    color: #888;
                    font-weight: bold;
                    font-size: 0.85rem;
                }
                .comment-time{
                    color: #888;
                    font-size: 0.8rem;
                    padding-top: @small-margin;
                    .reply-btn{
                        font-weight: bold;
                        padding-left: 0.3rem;
                    }
                }
                .reply-wrapper{
                    display: flex;
                    flex-direction: column;
                    .reply-item{
                        padding-top: @small-margin;
                        display: flex;
                        .small-avater{
                            width: @small-avater-size;
                            height: @small-avater-size;
                            border-radius: @circle-avater;
                        }
                        .reply-detail{
                            flex: 1;
                            padding-left: @small-margin;
                            .reply-username{
                                color: #888;
                                font-size: 0.8rem;
                                font-weight: bold;
                            }
                        }
                    }

                }
            }
        }
    }
</style>
